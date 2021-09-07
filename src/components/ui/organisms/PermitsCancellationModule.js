import React from "react";
import { useSelector } from "react-redux";
import { PermitToCancelCard } from "../../cards/PermitToCancelCard";
import { PermitsCancelationTable } from "../../tables/PermitsCancelationTable";

export const PermitsCancellationModule = () => {
	const { permitToCancelSelected } = useSelector((state) => state.permisosScreen);

	return (
		<div className="row">
			<div className="col-sm-8">
				<PermitsCancelationTable />
			</div>
			<div className="col-sm-4">{permitToCancelSelected && <PermitToCancelCard />}</div>
		</div>
	);
};
