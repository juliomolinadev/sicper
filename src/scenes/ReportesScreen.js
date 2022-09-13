import React, { useEffect } from "react";
import { ModuloInformesPermisos } from "../components/modulos/ModuloInformesPermisos";
import { useDispatch, useSelector } from "react-redux";
import { ReporteExpedicion } from "../components/ui/organisms/ReporteExpedicion";
import { useForm } from "../hooks/useForm";
import { RadioButtonGroup } from "../components/ui/molecules/RadioButtonGroup";
import { startSetAutorizados, startSetExpedicion } from "../actions/scenes/reportesScreen";
import { ModuloInformesPadron } from "../components/modulos/ModuloInformesPadron";
import { ModuloInformesTransferencias } from "../components/modulos/ModuloInformesTransferencias";
import { ModuloInformesCesvbc } from "../components/modulos/ModuloInformesCesvbc";

export const ReportesScreen = () => {
	const { privilegios, variablesGlobales } = useSelector((state) => state.auth);
	const { cicloConsulta: ciclo } = variablesGlobales;
	const [reportTypeValues, handleReportTipeInputChange] = useForm();

	const dispatch = useDispatch();

	const reportTypes = [
		{
			id: "expedicion",
			label: "Expedición"
		},
		{
			id: "permisos",
			label: "Permisos"
		},
		{
			id: "padron",
			label: "Padrón"
		},
		{
			id: "transferencias",
			label: "Transferencias"
		},
		{
			id: "sanidad",
			label: "CESVBC"
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
				{reportTypeValues.reportType === "padron" && privilegios.consultarPadron && (
					<ModuloInformesPadron />
				)}
			</div>

			<div className="mt-5">
				{reportTypeValues.reportType === "transferencias" &&
					privilegios.consultarTransferencias && <ModuloInformesTransferencias />}
			</div>

			<div className="mt-5">
				{reportTypeValues.reportType === "sanidad" && privilegios.consultarLabores && (
					<ModuloInformesCesvbc />
				)}
			</div>
			<div className="pb-5"></div>
		</div>
	);
};
