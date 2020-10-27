import React from "react";
import Datatable from "react-data-table-component";
import { useDispatch } from "react-redux";

export const CustomTable = ({ title, columns, data, customKey, setFunction, closeFunction }) => {
	const dispatch = useDispatch();

	const getRowSelected = (row) => {
		dispatch(setFunction(row[customKey]));
		dispatch(closeFunction());
	};

	const paginationOptions = {
		rowsPerPageText: "Filas por pagina",
		rangesSeparatorText: "de",
		selectAllRowsItem: true,
		selectAllRowsItemText: "Todos"
	};

	return (
		<div className="table-responsive border rounded">
			<Datatable
				columns={columns}
				data={data}
				title={title}
				pagination
				paginationComponentOptions={paginationOptions}
				// paginationResetDefaultPage={resetPaginationToggle}
				// subHeaderComponent={subHeaderComponentMemo}
				fixedHeader
				subHeader
				persistTableHead
				fixedHeaderScrollHeight="600px"
				highlightOnHover={true}
				striped={true}
				pointerOnHover={true}
				dense={true}
				onRowClicked={getRowSelected}
				// actions={actionsMemo}
			/>
		</div>
	);
};
