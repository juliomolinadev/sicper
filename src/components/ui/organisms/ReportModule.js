import React, { createRef } from "react";
import ReactToPrint from "react-to-print";
import { PrintableTable } from "../molecules/PrintableTable";

export const ReportModule = () => {
	const componentRef = createRef();

	return (
		<div className="container bgc">
			<div className="row">
				<div className="col-sm-12">
					<PrintableTable title="Una tabla genial" ref={componentRef} />
				</div>
			</div>
			<div className="row mt-4">
				<ReactToPrint
					trigger={() => (
						<button className="btn btn-outline-primary ml-5 d-print-none">
							<i className="fas fa-print"></i>
							<span> Imprimir</span>
						</button>
					)}
					content={() => componentRef.current}
				/>
			</div>
		</div>
	);
};
