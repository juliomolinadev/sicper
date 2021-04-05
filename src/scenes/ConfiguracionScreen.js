import React from "react";
import { CNAUsersRegister } from "../components/modulos/CNAUsersRegister";

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
					<CNAUsersRegister />
				</div>
			</div>
		</>
	);
};
