import React from "react";
import { UsersRoleManagement } from "../components/modulos/UsersRoleManagement";

export const ConfiguracionScreen = () => {
	return (
		<>
			<div className="row pt-4">
				<div className="col-sm-12 d-flex justify-content-center">
					<h1>Configuracion</h1>
				</div>
			</div>

			<div className="row pt-4">
				<div className="col-sm-12">
					<UsersRoleManagement />
				</div>
			</div>
		</>
	);
};
