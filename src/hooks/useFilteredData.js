import { useState } from "react";

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

const aplyFilter = (permisos, headers, filter, order1) => {
	const cleanPermisos = permisos.filter(
		(permiso) => permiso.cuenta !== "SUBTOTAL" && permiso.cuenta !== "TOTAL"
	);
	const unique = onlyUnique(cleanPermisos, filter);
	const separateData = [];
	const finalData = [];
	const totalRow = { cuenta: "TOTAL" };

	unique.forEach((value) => {
		separateData.push(cleanPermisos.filter((permiso) => permiso[filter] === value));
	});

	separateData.forEach((filterItem) => {
		const subTotalRow = { cuenta: "SUBTOTAL" };

		filterItem.sort((a, b) => sortFunction(a[order1], b[order1]));

		filterItem.forEach((order1Item) => {
			headers.forEach((header) => {
				if (header.sum) {
					if (subTotalRow[header.id]) subTotalRow[header.id] += order1Item[header.id];
					else subTotalRow[header.id] = order1Item[header.id];

					if (totalRow[header.id]) totalRow[header.id] += order1Item[header.id];
					else totalRow[header.id] = order1Item[header.id];
				}

				if (header.count) {
					if (subTotalRow[header.id]) subTotalRow[header.id]++;
					else subTotalRow[header.id] = 1;

					if (totalRow[header.id]) totalRow[header.id]++;
					else totalRow[header.id] = 1;
				}
			});
			finalData.push(order1Item);
		});
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
	if (!isNaN(a)) {
		if (a < b) return 1;
		if (a > b) return -1;
		return 0;
	} else {
		if (a > b) return 1;
		if (a < b) return -1;
		return 0;
	}
};
