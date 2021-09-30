import React, { useCallback, useState } from "react";
import Datatable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { exportJSONToExcel } from "../../helpers/functions/exportJSONToExcel";

export const CustomTable = ({ title, columns, data, setFunction, closeFunction }) => {
	const { name } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const Export = ({ onExport }) => (
		<button
			className="btn btn-sm btn-primary"
			onClick={(e) => {
				onExport(e.target.value);
			}}
		>
			Descargar
		</button>
	);

	const [sort, setSort] = useState({});

	const getSort = (col, direction) => {
		setSort({ col: col.selector, direction });
	};

	const sortFunction = useCallback(
		(a, b) => {
			const { col, direction } = sort;
			// console.log({ col, direction, a, b });
			if (a[col] > b[col]) {
				return 1;
			}
			if (a[col] < b[col]) {
				return -1;
			}
			return 0;
			// switch (direction) {
			// 	case "asc":
			// 		if (a[col] > b[col]) {
			// 			return 1;
			// 		}
			// 		if (a[col] < b[col]) {
			// 			return -1;
			// 		}
			// 		return 0;

			// 	case "desc":
			// 		if (a[col] > b[col]) {
			// 			return -1;
			// 		}
			// 		if (a[col] < b[col]) {
			// 			return 1;
			// 		}
			// 		return 0;

			// 	default:
			// 		// a must be equal to b
			// 		return 0;
			// }
		},
		[sort]
	);

	const actionsMemo = React.useMemo(
		() => (
			<Export
				onExport={() =>
					exportJSONToExcel(
						data.sort((a, b) => sortFunction(a, b)),
						title,
						name,
						title
					)
				}
			/>
		),
		[data, title]
	);

	const getRowSelected = (row) => {
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
			actions={actionsMemo}
			onSort={getSort}
		/>
	);
};
