import React from "react";
import Datatable from "react-data-table-component";
import { useDispatch } from "react-redux";

export const CustomPrintTable = ({ title, data, setFunction, closeFunction }) => {
	const dispatch = useDispatch();

	const getRowSelected = (row) => {
		if (setFunction !== undefined) {
			dispatch(setFunction(row));
		}

		if (closeFunction !== undefined) {
			dispatch(closeFunction());
		}
	};

	const columns = [
		{ name: "id", selector: "id", omit: true },
		{ name: "PERMISO", selector: "numeroPermiso", sortable: true, width: "70px" },
		{ name: "CUENTA", selector: "cuenta", sortable: true, width: "60px" },
		{ name: "USUARIO", selector: "usuario", sortable: true, width: "180px" },
		{ name: "PRODUCTOR", selector: "nombreProductor", width: "180px", sortable: true },
		{ name: "CULTIVO", selector: "nombreCultivo", width: "100px", sortable: true },
		{ name: "SUP(ha)", selector: "supAutorizada", width: "40px", sortable: true, center: true },
		{ name: "LOTE", selector: "lote", sortable: true, width: "40px", center: true },
		{ name: "LOCALIDAD", selector: "localidad", sortable: true, width: "80px" },
		{ name: "EMICION", selector: "fechaEmicion", sortable: true, width: "70px" },
		{ name: "VIGENCIA", selector: "vigencia", sortable: true, width: "70px" },
		{ name: "ESTADO", selector: "estadoPermiso", sortable: true, width: "70px" }
	];

	const customStyles = {
		headCells: {
			style: {
				paddingLeft: "5px", // override the cell padding for head cells
				paddingRight: "5px"
			}
		},

		headRow: {
			style: {
				backgroundColor: "lightgray"
			}
		},

		cells: {
			style: {
				fontSize: "10px",
				paddingLeft: "5px", // override the cell padding for data cells
				paddingRight: "5px"
			}
		}
	};

	return (
		<div className="table table-responsive table-striped">
			<Datatable
				columns={columns}
				data={data}
				title={title}
				highlightOnHover={true}
				striped={true}
				pointerOnHover={true}
				dense={true}
				onRowClicked={getRowSelected}
				customStyles={customStyles}
			/>
		</div>
	);
};
