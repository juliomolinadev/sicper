import React from "react";
import { PermisosTable } from "../tables/PermisosTable";

export const PermisosScreen = () => {
	return (
		<>
			<div className="row m-3 d-flex justify-content-center">
				<h1>Permisos</h1>
			</div>
			<div className="row m-3">
				<div className="col-sm-8 border rounded">
					<PermisosTable />
				</div>
			</div>
		</>
	);
};
