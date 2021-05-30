import React from "react";
import { ModuloInformesPermisos } from "../components/modulos/ModuloInformesPermisos";
import { useSelector } from "react-redux";
import { ReporteExpedicion } from "../components/ui/organisms/ReporteExpedicion";

export const ReportesScreen = () => {
	const { privilegios } = useSelector((state) => state.auth);
	const { reportesPermisos } = privilegios;

	return (
		<div>
			<div className="pb-5">
				<ReporteExpedicion />
			</div>
			<div className="pt-5">{reportesPermisos && false && <ModuloInformesPermisos />}</div>
			<div className="pb-5"></div>
		</div>
	);
};
