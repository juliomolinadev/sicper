import React from "react";
import { ModuloInformesPermisos } from "../components/modulos/ModuloInformesPermisos";
import { useSelector } from "react-redux";
import { ReporteExpedicion } from "../components/ui/organisms/ReporteExpedicion";
import { useForm } from "../hooks/useForm";
import { RadioButtonGroup } from "../components/ui/molecules/RadioButtonGroup";

export const ReportesScreen = () => {
	const { privilegios } = useSelector((state) => state.auth);
	const [reportTypeValues, handleReportTipeInputChange] = useForm();

	const reportTypes = [
		{
			id: "expedicion",
			label: "expedicion"
		},
		{
			id: "permisos",
			label: "permisos"
		}
	];

	const checkboxStyles = {
		group: "btn-group btn-group-toggle d-print-none",
		button: "btn btn-outline-primary"
	};

	return (
		<div className={"mt-5"}>
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
			<div className="pb-5"></div>
		</div>
	);
};
