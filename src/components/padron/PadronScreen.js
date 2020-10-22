import React from "react";
import { CustomTable } from "../tables/CustomTable";
import { padronColumns } from "../tables/configTables";
import { padron } from "../../data/padron";

export const PadronScreen = () => {
	const table = false;
	const tableTitle = "Padron de usuarios";

	return (
		<>
			<div className="row m-3 d-flex justify-content-center">
				<h1>Padron de usuarios</h1>
			</div>

			<div className="row m-3">
				<div className="col-sm-8 border rounded">
					<div>
						{table ? (
							<CustomTable title={tableTitle} data={padron} columns={padronColumns} />
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
