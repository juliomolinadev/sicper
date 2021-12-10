import React from "react";
import Datatable from "react-data-table-component";
import { useDispatch } from "react-redux";

export const CustomTable = ({
	title,
	columns,
	data,
	setFunction,
	closeFunction,
	simpleSetFunction
}) => {
	const dispatch = useDispatch();

	const getRowSelected = (row) => {
		if (setFunction !== undefined) {
			dispatch(setFunction(row));
		}

		if (closeFunction !== undefined) {
			dispatch(closeFunction());
		}

		if (simpleSetFunction !== undefined) {
			simpleSetFunction(row);
		}
	};

	const paginationOptions = {
		rowsPerPageText: "Filas por pagina",
		rangesSeparatorText: "de",
		selectAllRowsItem: true,
		selectAllRowsItemText: "Todos"
	};

	return (
		<Datatable
			onClick={(e) => console.log(e)}
			columns={columns}
			data={data}
			title={title}
			pagination
			paginationComponentOptions={paginationOptions}
			fixedHeader
			persistTableHead
			fixedHeaderScrollHeight="380px"
			highlightOnHover={true}
			striped={true}
			pointerOnHover={true}
			dense={true}
			onRowClicked={getRowSelected}
		/>
	);
};
