import { useState } from "react";
import { roundToN } from "../helpers/functions/roundToN";

export const useFilteredData = (
	headers,
	initialData = [],
	initialFilters = { filter: "", order1: "" }
) => {
	const [data, setData] = useState(initialData);
	const [filters, setFilters] = useState(initialFilters);
	const { filter, order1 } = filters;

	const handleFiltersChange = ({ target }) => {
		setFilters({
			...filters,
			[target.name]: target.value
		});

		if (target.name === "filter") setData(aplyFilter(data, headers, target.value, order1));
		if (target.name === "order1") setData(aplyFilter(data, headers, filter, target.value));
	};

	return [data, setData, filters, handleFiltersChange];
};

const aplyFilter = (dataSet, headers, filter, order1) => {
	const mainKey = headers[0].id;
	const ids = [];
	const cleanDataSet = dataSet.filter((row) => {
		if (
			row[mainKey] !== "-" &&
			row[mainKey] !== "SUBTOTAL" &&
			row[mainKey] !== "TOTAL" &&
			!ids.find((id) => id === row[mainKey])
		) {
			ids.push(row[mainKey]);
			return true;
		} else return false;
	});
	const unique = onlyUnique(cleanDataSet, filter);
	const separateData = [];
	const finalData = [];
	const totalRow = { [mainKey]: "TOTAL" };

	unique.forEach((value) => {
		separateData.push(cleanDataSet.filter((row) => row[filter] === value));
	});

	separateData.forEach((batch) => {
		const subTotalRow = { [mainKey]: "SUBTOTAL" };
		const emtyRow = { [mainKey]: "-" };
		const separateBatch = [];
		const finalBatch = [];

		batch.sort((a, b) => sortFunction(a[order1], b[order1]));
		const uniqueOrder1 = onlyUnique(batch, order1);
		uniqueOrder1.forEach((value) => {
			separateBatch.push(batch.filter((row) => row[order1] === value));
		});

		separateBatch.forEach((subBatch) => {
			subBatch.forEach((row) => {
				finalBatch.push(row);
			});
			finalBatch.push(emtyRow);
		});

		finalBatch.pop();

		finalBatch.forEach((row) => {
			headers.forEach((header) => {
				if (header.sum) {
					if (row[header.id]) {
						if (subTotalRow[header.id]) subTotalRow[header.id] += row[header.id];
						else subTotalRow[header.id] = row[header.id];

						if (totalRow[header.id]) totalRow[header.id] += row[header.id];
						else totalRow[header.id] = row[header.id];
					}
				}

				if (header.count) {
					if (row[header.id]) {
						if (subTotalRow[header.id]) subTotalRow[header.id]++;
						else subTotalRow[header.id] = 1;

						if (totalRow[header.id]) totalRow[header.id]++;
						else totalRow[header.id] = 1;
					}
				}
			});
			finalData.push(row);
		});

		for (const key in subTotalRow) {
			if (typeof subTotalRow[key] === "number") subTotalRow[key] = roundToN(subTotalRow[key], 4);
		}
		finalData.push(subTotalRow);
	});
	finalData.push(totalRow);
	return finalData;
};

const onlyUnique = (objectsArray, key) => {
	const unique = [];
	objectsArray.forEach((element) => {
		const index = unique.indexOf(element[key]);
		if (index === -1) {
			unique.push(element[key]);
		}
	});

	unique.sort((a, b) => sortFunction(a, b));
	return unique;
};

const sortFunction = (a, b) => {
	switch (typeof a) {
		case "number":
			if (a < b) return 1;
			if (a > b) return -1;
			return 0;

		default:
			if (a > b) return 1;
			if (a < b) return -1;
			return 0;
	}
};
