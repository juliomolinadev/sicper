import React, { useEffect } from "react";
import { loadAutorizadosGlobal } from "../../../helpers/DB/loadAutorizadosGlobal";
import { loadAvanceSuperficieExpedida } from "../../../helpers/DB/loadAvanceSuperficieExpedida";
import { filterReportData } from "../../../helpers/functions/filterReportData";
import { mergeReportData } from "../../../helpers/functions/mergeReportData";
import { useForm } from "../../../hooks/useForm";
import { ExpedicionTable } from "../molecules/ExpedicionTable";
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
			id: "Baja California",
			label: "Baja California"
		},
		{
			id: "Sonora",
			label: "Sonora"
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
	};

	const loadExpedicion = async () => {
		expedicion = await loadAvanceSuperficieExpedida();
	};

	useEffect(() => {
		loadExpedicion();
		loadAutorizados();
	}, []);

	const getModulos = () => {
		const modulos = [];
		Object.keys(modulosValues).forEach((modulo) => {
			modulosValues[modulo] && modulos.push(modulo);
		});

		return modulos;
	};

	// const imprimir = () => {
	// 	// console.log(getModulos());
	// 	// console.log(filterReportData(mergeReportData(autorizados, expedicion), "global"));
	// 	console.log(mergeReportData(autorizados, expedicion));
	// 	// console.table(expedicion);
	// 	// console.log(expedicion, autorizados);
	// 	// console.table(expedicion);
	// 	// console.log(autorizados);
	// };

	return (
		<div>
			{/* <button onClick={imprimir} className="btn btn-primary">
				imprimir
			</button> */}

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

			{(reportOptionsValues.opcion === "global" ||
				reportOptionsValues.opcion === "Baja California" ||
				reportOptionsValues.opcion === "Sonora") && (
				<div className="row mt-3">
					<div className="col-sm-12 pt-5">
						<ExpedicionTable
							data={filterReportData(
								mergeReportData(autorizados, expedicion),
								reportOptionsValues.opcion,
								[]
							)}
						/>
					</div>
				</div>
			)}

			{reportOptionsValues.opcion === "modulos" && getModulos().length > 0 && (
				<div className="row mt-3">
					<div className="col-sm-12 pt-5">
						<ExpedicionTable
							data={filterReportData(
								mergeReportData(autorizados, expedicion),
								reportOptionsValues.opcion,
								getModulos()
							)}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
