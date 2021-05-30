import React from "react";
import { loadAutorizadosGlobal } from "../../../helpers/DB/loadAutorizadosGlobal";
import { loadAvanceSuperficieExpedida } from "../../../helpers/DB/loadAvanceSuperficieExpedida";
import { useForm } from "../../../hooks/useForm";
import { RadioButtonGroup } from "../molecules/RadioButtonGroup";
import { ModulosCheckbox } from "./ModulosCheckbox";

export const ReporteExpedicion = () => {
	const [reportOptionsValues, handleReportOptionsInputChange] = useForm();
	const [modulosValues, handleModulosInputChange] = useForm();

	const reportOptions = [
		{
			id: "global",
			label: "Global"
		},
		{
			id: "bcSon",
			label: "BC - Sonora"
		},
		{
			id: "modulos",
			label: "Modulos"
		}
	];

	const checkboxStyles = {
		group: "btn-group btn-group-toggle",
		button: "btn btn-outline-primary"
	};

	const printExpedida = () => {
		loadAvanceSuperficieExpedida().then(console.log);
	};

	const printAutorizados = () => {
		loadAutorizadosGlobal().then(console.log);
	};

	return (
		<div>
			<div className="row mt-5 ">
				<button onClick={printExpedida} className="btn btn-primary">
					Expedida
				</button>
			</div>

			<div className="row mt-5 ">
				<button onClick={printAutorizados} className="btn btn-primary">
					Autorizados
				</button>
			</div>

			<div className="row m-0 ">
				<div className="col-sm-12 p-3 d-flex justify-content-center">
					<h2>Reporte Expedición</h2>
				</div>
			</div>

			<div className="row justify-content-center">
				<RadioButtonGroup
					inputName={"opcion"}
					options={reportOptions}
					formValues={reportOptionsValues}
					setFunction={handleReportOptionsInputChange}
					styles={checkboxStyles}
				/>
			</div>

			{reportOptionsValues.opcion === "modulos" && (
				<div className="row mt-3">
					<ModulosCheckbox
						modulosValues={modulosValues}
						handleModulosInputChange={handleModulosInputChange}
					/>
				</div>
			)}
		</div>
	);
};
