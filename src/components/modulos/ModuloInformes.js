import React from "react";
import { GraficoPrincipalesCultivos } from "../charts/GraficoPrincipalesCultivos";
import { FormPermisosInformes } from "../forms/FormPermisosInformes";
import { PermisosTable } from "../tables/PermisosTable";

export const ModuloInformes = ({ titulo }) => {
	return (
		<div className="border rounded">
			<div className="row m-0">
				<div className="p-3">
					<h2>{titulo}</h2>
				</div>
			</div>

			<div className="row m-0 bga">
				<div className="col-sm-4">
					<GraficoPrincipalesCultivos />
				</div>
				<div className="col-sm-8">
					<div className="row">
						<div className="col-sm-12">
							<FormPermisosInformes />
						</div>
					</div>
					<div className="row pt-4">
						<div className="col-sm-12 border rounded">
							<PermisosTable />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
