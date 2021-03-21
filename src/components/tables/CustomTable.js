import React from "react";
import Datatable from "react-data-table-component";
import { useDispatch } from "react-redux";

export const CustomTable = ({ title, columns, data, setFunction, closeFunction }) => {
	const dispatch = useDispatch();

	const getRowSelected = (row) => {
		console.log("setFunction en lugar: ", setFunction);
		if (setFunction !== undefined) {
			dispatch(setFunction(row));
		}

		if (closeFunction !== undefined) {
			dispatch(closeFunction());
		}
	};

	const paginationOptions = {
		rowsPerPageText: "Filas por pagina",
		rangesSeparatorText: "de",
		selectAllRowsItem: true,
		selectAllRowsItemText: "Todos"
	};

	return (
		<div className="table-responsive">
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
				onRowClicked={getRowSelected}
			/>
		</div>
	);
};
