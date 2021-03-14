import React from "react";
import { GraficoPrincipalesCultivos } from "../charts/GraficoPrincipalesCultivos";

export const ModuloInformes = ({ titulo }) => {
	return (
		<div className="border rounded m-1">
			<div className="row d-flex m-3">
				<div>
					<h2>{titulo}</h2>
				</div>
			</div>

			<div className="row">
				<div className="col-sm-5">
					<GraficoPrincipalesCultivos />
				</div>
				<div className="col-sm-5">
					<div className="border rounded">Parametros</div>
				</div>
				<div className="col-sm-2">
					<div className="border rounded">Botones</div>
				</div>
			</div>
		</div>
	);
};
