import React from "react";
import { ResumenAutorizados } from "../modulos/ResumenAutorizados";
import { FichaExpedicion } from "../modulos/FichaExpedicion";
import { NuevoPermisoButton } from "../buttons/NuevoPermisoButton";
import { useSelector } from "react-redux";

export const SicperScreen = () => {
	const { privilegios } = useSelector((state) => state.auth);

	return (
		<>
			<div className="row pt-5">
				<div className="col-sm-8">
					{privilegios.consultarAutorizados ? <ResumenAutorizados /> : <></>}
				</div>
				<div className="col-sm-4">
					{privilegios.expedirPermisos ? <NuevoPermisoButton /> : <></>}
					{privilegios.consultarExpedicion ? <FichaExpedicion /> : <></>}
				</div>
			</div>
		</>
	);
};
