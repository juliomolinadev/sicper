import React, { useEffect } from "react";
import { modulosPorUnidad as modulos } from "../../../helpers/consts";
import { loadAutorizadosGlobal } from "../../../helpers/DB/loadAutorizadosGlobal";
import { loadAvanceSuperficieExpedida } from "../../../helpers/DB/loadAvanceSuperficieExpedida";
import { filterReportData } from "../../../helpers/functions/filterReportData";
import { mergeReportData } from "../../../helpers/functions/mergeReportData";
import { useForm } from "../../../hooks/useForm";
import { useMultipleSelectionButtonGroup } from "../../../hooks/useMultipleSelectionButtonGroup";
import { useSingleSelectionButtonGroup } from "../../../hooks/useSingleSelectionButtonGroup";
import { ExpedicionTable } from "../molecules/ExpedicionTable";
import { RadioButtonGroup } from "../molecules/RadioButtonGroup";
import { ModulosCheckbox } from "./ModulosCheckbox";

let expedicion = [];
let autorizados = [];

export const ReporteExpedicion = () => {
	const [reportOptionsValues, handleReportOptionsInputChange] = useForm();

	const unidades = {
		primeraUnidad: false,
		segundaUnidad: false,
		terceraUnidad: false
	};
	const [unidadButtonValues, handleUnidadSelect] = useSingleSelectionButtonGroup(unidades);

	const [primeraUnidad, handlePrimeraUnidadInputChange, handlePrimeraChange] =
		useMultipleSelectionButtonGroup(modulos.primeraUnidad);
	const [segundaUnidad, handleSegundaUnidadInputChange, handleSegundaChange] =
		useMultipleSelectionButtonGroup(modulos.segundaUnidad);
	const [terceraUnidad, handleTerceraUnidadInputChange, handleTerceraChange] =
		useMultipleSelectionButtonGroup(modulos.terceraUnidad);

	useEffect(() => {
		const primera = {};
		Object.keys(modulos.primeraUnidad).forEach((key) => {
			primera[key] = unidadButtonValues.primeraUnidad;
		});
		handlePrimeraChange(primera);

		const segunda = {};
		Object.keys(modulos.segundaUnidad).forEach((key) => {
			segunda[key] = unidadButtonValues.segundaUnidad;
		});
		handleSegundaChange(segunda);

		const tercera = {};
		Object.keys(modulos.terceraUnidad).forEach((key) => {
			tercera[key] = unidadButtonValues.terceraUnidad;
		});
		handleTerceraChange(tercera);
	}, [unidadButtonValues]);

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
		Object.keys(primeraUnidad).forEach((modulo) => {
			primeraUnidad[modulo] && modulos.push(modulo);
		});

		Object.keys(segundaUnidad).forEach((modulo) => {
			segundaUnidad[modulo] && modulos.push(modulo);
		});

		Object.keys(terceraUnidad).forEach((modulo) => {
			terceraUnidad[modulo] && modulos.push(modulo);
		});

		return modulos;
	};

	const showPrintButton = () => {
		switch (reportOptionsValues.opcion) {
			case "global":
			case "Baja California":
			case "Sonora":
				return true;

			case "modulos":
				if (getModulos().length > 0) return true;
				break;

			default:
				return false;
		}
	};

	return (
		<div>
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
				<ModulosCheckbox
					buttonValues={unidadButtonValues}
					handleSelectButton={handleUnidadSelect}
					primeraValues={primeraUnidad}
					primeraInputChange={handlePrimeraUnidadInputChange}
					segundaValues={segundaUnidad}
					segundaInputChange={handleSegundaUnidadInputChange}
					terceraValues={terceraUnidad}
					terceraInputChange={handleTerceraUnidadInputChange}
				/>
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

			{showPrintButton() && (
				<button
					type="button"
					className="btn btn-outline-primary ml-5 d-print-none"
					onClick={() => window.print()}
				>
					<i className="fas fa-print"></i>
					<span> Imprimir</span>
				</button>
			)}
		</div>
	);
};
