import React, { useEffect } from "react";
import { ModuloInformesPermisos } from "../components/modulos/ModuloInformesPermisos";
import { useDispatch, useSelector } from "react-redux";
import { ReporteExpedicion } from "../components/ui/organisms/ReporteExpedicion";
import { useForm } from "../hooks/useForm";
import { RadioButtonGroup } from "../components/ui/molecules/RadioButtonGroup";
import { startSetAutorizados, startSetExpedicion } from "../actions/scenes/reportesScreen";
import { PermitsReport } from "../components/ui/organisms/PermitsReport";

export const ReportesScreen = () => {
	const { privilegios, variablesGlobales } = useSelector((state) => state.auth);
	const { cicloActual: ciclo } = variablesGlobales;
	const [reportTypeValues, handleReportTipeInputChange] = useForm();

	const dispatch = useDispatch();

	const reportTypes = [
		{
			id: "expedicion",
			label: "expedicion"
		},
		{
			id: "permisos",
			label: "permisos"
		},
		{
			id: "permisos/seccion",
			label: "permisos/seccion"
		}
	];

	const checkboxStyles = {
		group: "btn-group btn-group-toggle d-print-none",
		button: "btn btn-outline-primary"
	};

	useEffect(() => {
		dispatch(startSetExpedicion(ciclo));
		dispatch(startSetAutorizados(ciclo));
	}, [dispatch, ciclo]);

	return (
		<div className="mt-5">
			<div className="row justify-content-center">
				<RadioButtonGroup
					inputName={"reportType"}
					options={reportTypes}
					formValues={reportTypeValues}
					setFunction={handleReportTipeInputChange}
					styles={checkboxStyles}
				/>
			</div>

			<div className="mt-5">
				{reportTypeValues.reportType === "expedicion" && privilegios.consultarExpedicion && (
					<ReporteExpedicion />
				)}
			</div>
			<div className="mt-5">
				{reportTypeValues.reportType === "permisos" && privilegios.consultarPermisos && (
					<ModuloInformesPermisos />
				)}
			</div>
			<div className="mt-5">
				{reportTypeValues.reportType === "permisos/seccion" && privilegios.consultarPermisos && (
					<PermitsReport />
				)}
			</div>
			<div className="pb-5"></div>
		</div>
	);
};
