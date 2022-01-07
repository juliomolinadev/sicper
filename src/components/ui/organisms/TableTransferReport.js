import React, { createRef, useEffect, useState } from "react";
import ReactToPrint from "react-to-print";
import { useSelector } from "react-redux";
// import { transferModulos as modulos } from "../../../helpers/consts";
import { getTransferTable } from "../../../helpers/DB/getTransferTable";
import { TransferTable } from "../molecules/TransferTable";

export const TableTransferReport = () => {
	const componentRef = createRef();

	const { cicloActual: ciclo } = useSelector((state) => state.auth.variablesGlobales);
	const [table, setTable] = useState([]);

	useEffect(() => {
		setTable([]);
		getTransferTable(ciclo).then((table) => setTable(table));
	}, [ciclo]);

	// const exportToExcel = () => {
	// 	const excelHeaders = [];
	// 	const fileHeaders = [];
	// 	const excelData = [];

	// 	modulos.forEach((header) => {
	// 		if (header.display) excelHeaders.push([header.id, header.header]);
	// 	});

	// 	table.forEach((row) => {
	// 		const newRow = {};
	// 		excelHeaders.forEach((header) => {
	// 			fileHeaders.push(header[1]);

	// 			if (typeof row[header[0]] === "object") {
	// 				const fechaObject = row[header[0]].toDate();
	// 				const fecha = fechaObject.toLocaleDateString();
	// 				newRow[header[1]] = fecha;
	// 			} else newRow[header[1]] = row[header[0]];
	// 		});
	// 		excelData.push(newRow);
	// 	});

	// 	exportJSONToExcel(
	// 		excelData,
	// 		fileHeaders,
	// 		excelTitle.substring(0, 30),
	// 		name,
	// 		excelTitle.substring(0, 30)
	// 	);
	// };

	return (
		<div>
			<div className="mt-4">
				<ReactToPrint
					trigger={() => (
						<button className="btn btn-sm btn-outline-primary d-print-none ">
							<i className="fas fa-print"></i>
							<span> Imprimir</span>
						</button>
					)}
					content={() => componentRef.current}
					pageStyle="bootstrap/dist/css/bootstrap.min.css"
					// pageStyle="../../../printStyles.css"
				/>

				{/* <button
					type="button"
					onClick={exportToExcel}
					className="btn btn-sm btn-outline-primary ml-2"
				>
					<i className="fas fa-download"></i>
					<span> Descargar</span>
				</button> */}
			</div>

			<TransferTable
				data={table}
				title="Un titulo"
				ref={componentRef}
				className={"mt-2"}
				orientation="landscape"
			/>
		</div>
	);
};
