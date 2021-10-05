import React, { createRef } from "react";
import ReactToPrint from "react-to-print";
import { PrintableTable } from "../molecules/PrintableTable";

export const ReportModule = ({ title, headers, data }) => {
	const componentRef = createRef();

	return (
		<div className="container">
			<PrintableTable title={title} headers={headers} data={data} ref={componentRef} />

			<ReactToPrint
				trigger={() => (
					<button className="btn btn-outline-primary d-print-none">
						<i className="fas fa-print"></i>
						<span> Imprimir</span>
					</button>
				)}
				content={() => componentRef.current}
				pageStyle="bootstrap/dist/css/bootstrap.min.css"
			/>
		</div>
	);
};
