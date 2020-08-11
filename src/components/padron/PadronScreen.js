import React from "react";
import { Table } from "../tables/PadronTable";

export const PadronScreen = () => {
	return (
		<>
			<div className="row m-3 d-flex justify-content-center">
				<h1>Padron de usuarios</h1>
			</div>
			<div className="row m-3">
				<div className="col-sm-8 border rounded">
					<Table />
				</div>
			</div>
		</>
	);
};
