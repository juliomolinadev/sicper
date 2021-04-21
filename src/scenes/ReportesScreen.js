import React from "react";
import { ModuloInformesPermisos } from "../components/modulos/ModuloInformesPermisos";
import { useSelector } from "react-redux";

export const ReportesScreen = () => {
	const { privilegios } = useSelector((state) => state.auth);

	return (
		<div>
			<div className="pt-5">
				{privilegios.reportesPermisos ? <ModuloInformesPermisos /> : <></>}
			</div>
			<div className="pb-5"></div>
		</div>
	);
};
