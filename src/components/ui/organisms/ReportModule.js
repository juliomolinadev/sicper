import React, { createRef } from "react";
import ReactToPrint from "react-to-print";
import { PrintableTable } from "../molecules/PrintableTable";

export const ReportModule = ({ title, headers, data, rowsPerPage, orientation }) => {
	const componentRef = createRef();

	return (
		<div className="container">
			<ReactToPrint
				trigger={() => (
					<button className="btn btn-outline-primary d-print-none mb-4">
						<i className="fas fa-print"></i>
						<span> Imprimir</span>
					</button>
				)}
				content={() => componentRef.current}
				pageStyle="bootstrap/dist/css/bootstrap.min.css"
			/>

			<PrintableTable
				title={title}
				headers={headers}
				data={data}
				ref={componentRef}
				rowsPerPage={rowsPerPage}
				orientation={orientation}
				className={"mt-0"}
			/>
		</div>
	);
};
