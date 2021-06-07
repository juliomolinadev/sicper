import React, { useEffect } from "react";
import { loadAutorizadosGlobal } from "../../../helpers/DB/loadAutorizadosGlobal";
import { loadAvanceSuperficieExpedida } from "../../../helpers/DB/loadAvanceSuperficieExpedida";
import { filterReportData } from "../../../helpers/functions/filterReportData";
import { mergeReportData } from "../../../helpers/functions/mergeReportData";
import { useForm } from "../../../hooks/useForm";
import { RadioButtonGroup } from "../molecules/RadioButtonGroup";
import { ModulosCheckbox } from "./ModulosCheckbox";

let expedicion = [];
let autorizados = [];

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

	const loadAutorizados = async () => {
		autorizados = await loadAutorizadosGlobal();
		console.log("Secargo autorizados!!");
	};

	const loadExpedicion = async () => {
		expedicion = await loadAvanceSuperficieExpedida();
		console.log("Secargo autorizados!!");
	};

	useEffect(() => {
		loadExpedicion();
		loadAutorizados();
	}, []);

	const imprimir = () => {
		console.log(filterReportData(mergeReportData(autorizados, expedicion), "global"));
		// console.table(mergeReportData(autorizados, expedicion));
		// console.table(expedicion);
		// console.log(expedicion, autorizados);
		// console.table(expedicion);
		// console.log(autorizados);
	};

	return (
		<div>
			<button onClick={imprimir} className="btn btn-primary">
				imprimir
			</button>

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
