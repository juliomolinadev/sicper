import React from "react";
import Datatable from "react-data-table-component";
import { useDispatch } from "react-redux";

export const CustomSelectableTable = ({
	title,
	columns,
	data,
	setSelectedRowsFunction,
	contextMessage
}) => {
	const dispatch = useDispatch();

	const setSelectedRows = (rows) => {
		dispatch(setSelectedRowsFunction(rows.selectedRows));
	};

	const paginationOptions = {
		rowsPerPageText: "Filas por pagina",
		rangesSeparatorText: "de",
		selectAllRowsItem: true,
		selectAllRowsItemText: "Todos"
	};

	return (
		<Datatable
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
			selectableRows={true}
			onSelectedRowsChange={setSelectedRows}
			contextMessage={contextMessage}
		/>
	);
};
