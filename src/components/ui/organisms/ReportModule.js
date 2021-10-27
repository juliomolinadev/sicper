import React, { createRef, useState } from "react";
import { useSelector } from "react-redux";
import ReactToPrint from "react-to-print";
import { exportJSONToExcel } from "../../../helpers/functions/exportJSONToExcel";
import { PrintableTable } from "../molecules/PrintableTable";

export const ReportModule = ({
	title,
	excelTitle,
	headers,
	data,
	// rowsPerPage,
	// orientation,
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

	const [pageConfig, setPageConfig] = useState({ orientation: "landscape", rowsPerPage: 25 });
	const { orientation, rowsPerPage } = pageConfig;

	const setLandscape = () => {
		setPageConfig({ rowsPerPage: 25, orientation: "landscape" });
	};
	const setPortrait = () => {
		setPageConfig({ rowsPerPage: 50, orientation: "portrait" });
	};
	const addRow = () => {
		setPageConfig({ ...pageConfig, rowsPerPage: rowsPerPage + 1 });
	};
	const removeRow = () => {
		setPageConfig({ ...pageConfig, rowsPerPage: rowsPerPage - 1 });
	};

	return (
		<div className="container">
			<div className="row mb-4">
				<div className="col-sm-4 d-flex mt-4">
					<label htmlFor="orientation">
						Lineas por pagina: <b>{rowsPerPage}</b>
					</label>
					<div className="btn-group btn-group-toggle d-print-none mr-4 ml-2" id="orientation">
						<button
							onClick={addRow}
							className="btn btn-sm btn-outline-primary"
							style={{ width: 40 }}
						>
							+
						</button>
						<button
							onClick={removeRow}
							className="btn btn-sm btn-outline-primary"
							style={{ width: 40 }}
						>
							-
						</button>
					</div>
				</div>

				<div className="col-sm-4 d-flex mt-4">
					<label htmlFor="orientation">Orientacion:</label>
					<div className="btn-group btn-group-toggle d-print-none mr-4 ml-2" id="orientation">
						<button
							onClick={setLandscape}
							className={`btn btn-sm ${
								orientation === "landscape" ? "btn-primary" : "btn-outline-primary"
							}`}
						>
							Horizontal
						</button>
						<button
							onClick={setPortrait}
							className={`btn btn-sm ${
								orientation === "portrait" ? "btn-primary" : "btn-outline-primary"
							}`}
						>
							Vertical
						</button>
					</div>
				</div>

				<div className="col-sm-4 d-flex justify-content-end mt-4">
					<ReactToPrint
						trigger={() => (
							<button className="btn btn-sm btn-outline-primary d-print-none ">
								<i className="fas fa-print"></i>
								<span> Imprimir</span>
							</button>
						)}
						content={() => componentRef.current}
						pageStyle="bootstrap/dist/css/bootstrap.min.css"
					/>

					<button
						type="button"
						onClick={exportToExcel}
						className="btn btn-sm btn-outline-primary ml-2"
					>
						<i className="fas fa-download"></i>
						<span> Descargar</span>
					</button>
				</div>
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
