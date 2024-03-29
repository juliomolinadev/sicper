import React, { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { modulosPorUnidad } from "../../../helpers/consts";
import { filterReportData } from "../../../helpers/functions/filterReportData";
import { mergeReportData } from "../../../helpers/functions/mergeReportData";
import { useForm } from "../../../hooks/useForm";
import { modulosCheckboxReducer } from "../../../reducers/modulosCheckboxReducer";
import { ExpedicionTable } from "../molecules/ExpedicionTable";
import { RadioButtonGroup } from "../molecules/RadioButtonGroup";
import { ModulosCheckbox } from "./ModulosCkeckbox";

const unidades = {
	primeraUnidad: false,
	segundaUnidad: false,
	terceraUnidad: false,
	pozosParticulares: false
};

const initialState = { unidades, modulosPorUnidad };

export const ReporteExpedicion = () => {
	const { privilegios, modulo } = useSelector((state) => state.auth);
	const { autorizados, expedicion } = useSelector((state) => state.scenes.reportesScreen);

	const [reportOptionsValues, handleReportOptionsInputChange, , setAValue] = useForm();

	if (Object.keys(reportOptionsValues).length === 0) setAValue({ opcion: "modulo" });

	const [state, dispatch] = useReducer(modulosCheckboxReducer, initialState);
	const { unidades, modulosPorUnidad } = state;
	const { primeraUnidad, segundaUnidad, terceraUnidad, pozosParticulares } = modulosPorUnidad;

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

	useEffect(() => {
		dispatch({
			type: "changeGroup"
		});
	}, [unidades]);

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

		Object.keys(pozosParticulares).forEach((modulo) => {
			pozosParticulares[modulo] && modulos.push(modulo);
		});

		return modulos;
	};

	return (
		<div>
			<div className="row m-0 ">
				<div className="col-sm-12 p-3 d-flex justify-content-center">
					<h2>Reporte de expedición</h2>
				</div>
			</div>

			<div className="row justify-content-center">
				{privilegios.accesoGlobal && (
					<RadioButtonGroup
						inputName={"opcion"}
						options={reportOptions}
						formValues={reportOptionsValues}
						setFunction={handleReportOptionsInputChange}
						styles={checkboxStyles}
					/>
				)}
			</div>

			{reportOptionsValues.opcion === "modulos" && (
				<ModulosCheckbox state={state} dispatch={dispatch} />
			)}

			{((privilegios.accesoGlobal && reportOptionsValues.opcion === "global") ||
				reportOptionsValues.opcion === "Baja California" ||
				reportOptionsValues.opcion === "Sonora") && (
				<div className="row mt-3">
					<div className="col-sm-12 pt-5">
						<ExpedicionTable
							modulos={[]}
							data={filterReportData(
								mergeReportData(autorizados, expedicion),
								reportOptionsValues.opcion,
								[]
							)}
						/>
					</div>
				</div>
			)}

			{privilegios.accesoGlobal &&
				reportOptionsValues.opcion === "modulos" &&
				getModulos().length > 0 && (
					<div className="row mt-3">
						<div className="col-sm-12 pt-5">
							<ExpedicionTable
								modulos={getModulos()}
								data={filterReportData(
									mergeReportData(autorizados, expedicion),
									reportOptionsValues.opcion,
									getModulos()
								)}
							/>
						</div>
					</div>
				)}

			{!privilegios.accesoGlobal && (
				<div className="row mt-3">
					<div className="col-sm-12 pt-5">
						{autorizados && expedicion && (
							<ExpedicionTable
								modulos={[modulo]}
								data={filterReportData(
									mergeReportData(autorizados, expedicion),
									reportOptionsValues.opcion,
									[modulo]
								)}
							/>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
