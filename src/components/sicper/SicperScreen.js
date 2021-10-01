import React from "react";
import { ResumenAutorizados } from "../modulos/ResumenAutorizados";
import { FichaExpedicion } from "../modulos/FichaExpedicion";
import { NuevoPermisoButton } from "../buttons/NuevoPermisoButton";
import { useSelector } from "react-redux";
import { UnassignedPrivilegesMessage } from "../cards/UnassignedPrivilegesMessage";

export const SicperScreen = () => {
	const { privilegios, rol, expedicionActivaModulo } = useSelector((state) => state.auth);
	const { variablesGlobales } = useSelector((state) => state.auth);
	const { expedicionActiva } = variablesGlobales;

	return (
		<>
			<div className="row pt-5">
				<div className="col-sm-8">
					{privilegios.consultarAutorizados && <ResumenAutorizados />}

					<button
						className="btn btn-outline-primary mt-4 no-printme"
						type="button"
						onClick={() => window.print()}
					>
						<span>Imprimir</span>
						<i className="fas fa-print"></i>
					</button>
				</div>
				<div className="col-sm-4 no-printme">
					{expedicionActiva && expedicionActivaModulo && privilegios.expedirPermisos && (
						<NuevoPermisoButton />
					)}
					{privilegios.consultarExpedicion && <FichaExpedicion />}
				</div>
			</div>

			<div className="row d-flex justify-content-center pt-5">
				<div className="col-sm-6">{rol === "sinAsignar" && <UnassignedPrivilegesMessage />}</div>
			</div>
		</>
	);
};
