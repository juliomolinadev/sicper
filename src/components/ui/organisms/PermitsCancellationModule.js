import React from "react";
import { PermitsCancelationTable } from "../../tables/PermitsCancelationTable";

export const PermitsCancellationModule = () => {
	return (
		<div className="row">
			<div className="col-sm-8">
				<PermitsCancelationTable />
			</div>
			<div className="col-sm-4">Ficha</div>
		</div>
	);
};
