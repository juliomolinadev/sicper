import React from "react";
import { ResumenAutorizados } from "../modulos/ResumenAutorizados";
import { FichaExpedicion } from "../modulos/FichaExpedicion";
import { NuevoPermisoButton } from "../buttons/NuevoPermisoButton";
import { useSelector } from "react-redux";
import { UnassignedPrivilegesMessage } from "../cards/UnassignedPrivilegesMessage";

export const SicperScreen = () => {
	const { privilegios, rol } = useSelector((state) => state.auth);
	const { variablesGlobales } = useSelector((state) => state.auth);
	const { expedicionActiva } = variablesGlobales;

	return (
		<>
			<div className="row pt-5">
				<div className="col-sm-8">{privilegios.consultarAutorizados && <ResumenAutorizados />}</div>
				<div className="col-sm-4">
					{expedicionActiva && privilegios.expedirPermisos && <NuevoPermisoButton />}
					{privilegios.consultarExpedicion && <FichaExpedicion />}
				</div>
			</div>

			<div className="row d-flex justify-content-center pt-5">
				<div className="col-sm-6">{rol === "sinAsignar" && <UnassignedPrivilegesMessage />}</div>
			</div>
		</>
	);
};
