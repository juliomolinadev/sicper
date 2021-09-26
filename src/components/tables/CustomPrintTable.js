import React from "react";
import Datatable from "react-data-table-component";
import { useDispatch } from "react-redux";

export const CustomPrintTable = ({ title, data, columns, setFunction, closeFunction }) => {
	const dispatch = useDispatch();

	const getRowSelected = (row) => {
		if (setFunction !== undefined) {
			dispatch(setFunction(row));
		}

		if (closeFunction !== undefined) {
			dispatch(closeFunction());
		}
	};

	const customStyles = {
		headCells: {
			style: {
				paddingLeft: "5px",
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
				paddingLeft: "5px",
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
