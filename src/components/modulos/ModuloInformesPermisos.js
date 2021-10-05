import React from "react";
import { GraficoPrincipalesCultivos } from "../charts/GraficoPrincipalesCultivos";
import { FormPermisosInformes } from "../forms/FormPermisosInformes";
import { PermisosTable } from "../tables/PermisosTable";

export const ModuloInformesPermisos = () => {
	return (
		<div>
			<div className="row m-0 ">
				<div className="col-sm-12 p-3 d-flex justify-content-center">
					<h2>Reporte de permisos</h2>
				</div>
			</div>

			<div className="row p-3 d-flex justify-content-center">
				<div className="col-sm-9 no-printme">
					<FormPermisosInformes />
				</div>
			</div>

			<div className="row d-flex justify-content-center">
				<div className="col-sm-5 no-printme">
					<GraficoPrincipalesCultivos />
				</div>
			</div>

			<div className="row d-flex justify-content-center">
				<div className="col-lg-9">
					<PermisosTable />
				</div>
			</div>
		</div>
	);
};
