import React, { createRef } from "react";
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import { exportJSONToExcel } from "../../../helpers/functions/exportJSONToExcel";
import { PrintableTable } from "../molecules/PrintableTable";

export const ReportModule = ({
	title,
	excelTitle,
	headers,
	data,
	rowsPerPage,
	orientation,
	range
}) => {
	const componentRef = createRef();
	const { name } = useSelector((state) => state.auth);

	const exportToExcel = () => {
		const excelHeaders = [];
		const fileHeaders = [];
		const excelData = [];

		headers.forEach((header) => {
			if (header.display) excelHeaders.push([header.id, header.header]);
		});

		data.forEach((row) => {
			const newRow = {};
			excelHeaders.forEach((header) => {
				fileHeaders.push(header[1]);

				if (typeof row[header[0]] === "object") {
					const fechaObject = row[header[0]].toDate();
					const fecha = fechaObject.toLocaleDateString();
					newRow[header[1]] = fecha;
				} else newRow[header[1]] = row[header[0]];
			});
			excelData.push(newRow);
		});

		exportJSONToExcel(
			excelData,
			fileHeaders,
			excelTitle.substring(0, 30),
			name,
			excelTitle.substring(0, 30)
		);
	};

	return (
		<div className="container">
			<div className="mb-4">
				<ReactToPrint
					trigger={() => (
						<button className="btn btn-outline-primary d-print-none ">
							<i className="fas fa-print"></i>
							<span> Imprimir</span>
						</button>
					)}
					content={() => componentRef.current}
					pageStyle="bootstrap/dist/css/bootstrap.min.css"
				/>

				<button type="button" onClick={exportToExcel} className="btn btn-outline-primary ml-4">
					<i className="fas fa-download"></i>
					<span> Descargar</span>
				</button>
			</div>

			<PrintableTable
				title={title}
				headers={headers}
				data={data}
				ref={componentRef}
				rowsPerPage={rowsPerPage}
				orientation={orientation}
				className={"mt-0"}
				range={range}
			/>
		</div>
	);
};
