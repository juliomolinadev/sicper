import React from "react";
import { useSelector } from "react-redux";
import { exportJSONToExcel } from "../../../helpers/functions/exportJSONToExcel";
import { roundToN } from "../../../helpers/functions/roundToN";

export const ExpedicionTable = ({ data, modulos }) => {
	const { name } = useSelector((state) => state.auth);

	const exportToExcel = () => {
		const title = setTitle(modulos);
		const headers = {
			header: [
				"CULTIVO",
				"GRAVEDAD PROGRAMADA",
				"GRAVEDAD EXPEDIDA",
				"GRAVEDAD REALIZADA",
				"POZO PROGRAMADA",
				"POZO EXPEDIDA",
				"POZO REALIZADA",
				"POZO PART PROGRAMADA",
				"POZO PART EXPEDIDA",
				"POZO PART REALIZADA",
				"TOTAL PROGRAMADA",
				"TOTAL EXPEDIDA",
				"TOTAL REALIZADA"
			]
		};

		exportJSONToExcel(setUpData(data), headers, title, name, title);
	};

	return (
		<div className="table-responsive-sm">
			<table className="table table-sm table-bordered font12">
				<thead>
					<tr>
						<th scope="row" rowSpan="2">
							CULTIVO
						</th>
						<th scope="row" colSpan="3">
							SUP. GRAVEDAD
						</th>
						<th scope="row" colSpan="3">
							SUP. POZO FEDERAL
						</th>
						<th scope="row" colSpan="3">
							SUP. POZO PARTICULAR
						</th>
						<th scope="row" colSpan="3">
							SUP. TOTAL
						</th>
					</tr>
					<tr>
						<th scope="col">Programada</th>
						<th scope="col">Expedida</th>
						<th scope="col">Realizado</th>
						<th scope="col">Programada</th>
						<th scope="col">Expedida</th>
						<th scope="col">Realizado</th>
						<th scope="col">Programada</th>
						<th scope="col">Expedida</th>
						<th scope="col">Realizado</th>
						<th scope="col">Programada</th>
						<th scope="col">Expedida</th>
						<th scope="col">Realizado</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row" colSpan="13" className="pt-4">
							OTOÑO - INVIERNO
						</th>
					</tr>
					{Object.values(data["OTOÑO-INVIERNO"]).map((cultivo, i) => {
						const nombreCultivo = Object.keys(data["OTOÑO-INVIERNO"])[i];

						return (
							<tr key={nombreCultivo}>
								<th scope="row">{nombreCultivo}</th>
								<td className="text-right">{roundToN(cultivo.supGravedadProgramada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supGravedadExpedida, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supGravedadRealizada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoProgramada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoExpedida, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoRealizada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoPartProgramada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoPartExpedida, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoPartRealizada, 3)}</td>

								<td className="text-right">
									{roundToN(
										cultivo.supGravedadProgramada +
											cultivo.supPozoProgramada +
											cultivo.supPozoPartProgramada,
										3
									)}
								</td>
								<td className="text-right">
									{roundToN(
										cultivo.supGravedadExpedida +
											cultivo.supPozoExpedida +
											cultivo.supPozoPartExpedida,
										3
									)}
								</td>
								<td className="text-right">
									{roundToN(
										cultivo.supGravedadRealizada +
											cultivo.supPozoRealizada +
											cultivo.supPozoPartRealizada,
										3
									)}
								</td>
							</tr>
						);
					})}

					<tr>
						<th scope="row" colSpan="13" className="pt-4">
							PERENNES
						</th>
					</tr>
					{Object.values(data["PERENNES"]).map((cultivo, i) => {
						const nombreCultivo = Object.keys(data["PERENNES"])[i];

						return (
							<tr key={nombreCultivo}>
								<th scope="row">{nombreCultivo}</th>
								<td className="text-right">{roundToN(cultivo.supGravedadProgramada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supGravedadExpedida, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supGravedadRealizada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoProgramada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoExpedida, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoRealizada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoPartProgramada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoPartExpedida, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoPartRealizada, 3)}</td>

								<td className="text-right">
									{roundToN(
										cultivo.supGravedadProgramada +
											cultivo.supPozoProgramada +
											cultivo.supPozoPartProgramada,
										3
									)}
								</td>
								<td className="text-right">
									{roundToN(
										cultivo.supGravedadExpedida +
											cultivo.supPozoExpedida +
											cultivo.supPozoPartExpedida,
										3
									)}
								</td>
								<td className="text-right">
									{roundToN(
										cultivo.supGravedadRealizada +
											cultivo.supPozoRealizada +
											cultivo.supPozoPartRealizada,
										3
									)}
								</td>
							</tr>
						);
					})}

					<tr>
						<th scope="row" colSpan="13" className="pt-4">
							PRIMAVERA-VERANO
						</th>
					</tr>
					{Object.values(data["PRIMAVERA-VERANO"]).map((cultivo, i) => {
						const nombreCultivo = Object.keys(data["PRIMAVERA-VERANO"])[i];

						return (
							<tr key={nombreCultivo}>
								<th scope="row">{nombreCultivo}</th>
								<td className="text-right">{roundToN(cultivo.supGravedadProgramada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supGravedadExpedida, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supGravedadRealizada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoProgramada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoExpedida, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoRealizada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoPartProgramada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoPartExpedida, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoPartRealizada, 3)}</td>

								<td className="text-right">
									{roundToN(
										cultivo.supGravedadProgramada +
											cultivo.supPozoProgramada +
											cultivo.supPozoPartProgramada,
										3
									)}
								</td>
								<td className="text-right">
									{roundToN(
										cultivo.supGravedadExpedida +
											cultivo.supPozoExpedida +
											cultivo.supPozoPartExpedida,
										3
									)}
								</td>
								<td className="text-right">
									{roundToN(
										cultivo.supGravedadRealizada +
											cultivo.supPozoRealizada +
											cultivo.supPozoPartRealizada,
										3
									)}
								</td>
							</tr>
						);
					})}

					<tr>
						<th scope="row" colSpan="13" className="pt-4">
							-
						</th>
					</tr>
					{Object.values(data["TOTAL"]).map((cultivo, i) => {
						const nombreCultivo = Object.keys(data["TOTAL"])[i];

						return (
							<tr key={nombreCultivo}>
								<th scope="row">{nombreCultivo}</th>
								<td className="text-right">{roundToN(cultivo.supGravedadProgramada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supGravedadExpedida, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supGravedadRealizada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoProgramada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoExpedida, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoRealizada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoPartProgramada, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoPartExpedida, 3)}</td>
								<td className="text-right">{roundToN(cultivo.supPozoPartRealizada, 3)}</td>

								<td className="text-right">
									{roundToN(
										cultivo.supGravedadProgramada +
											cultivo.supPozoProgramada +
											cultivo.supPozoPartProgramada,
										3
									)}
								</td>
								<td className="text-right">
									{roundToN(
										cultivo.supGravedadExpedida +
											cultivo.supPozoExpedida +
											cultivo.supPozoPartExpedida,
										3
									)}
								</td>
								<td className="text-right">
									{roundToN(
										cultivo.supGravedadRealizada +
											cultivo.supPozoRealizada +
											cultivo.supPozoPartRealizada,
										3
									)}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>

			<button
				type="button"
				onClick={exportToExcel}
				className="btn btn-outline-primary d-print-none"
			>
				<i className="fas fa-download"></i>
				<span> Descargar</span>
			</button>

			<button
				type="button"
				className="btn btn-outline-primary ml-5 d-print-none"
				onClick={() => window.print()}
			>
				<i className="fas fa-print"></i>
				<span> Imprimir</span>
			</button>
		</div>
	);
};

const setUpData = (expedicion) => {
	const data = [];
	const subCiclos = Object.entries(expedicion);

	subCiclos.forEach((subCiclo) => {
		data.push({ cultivo: subCiclo[0] });
		const cultivos = Object.entries(subCiclo[1]);
		cultivos.forEach((cultivo) => {
			data.push({ cultivo: cultivo[0], ...cultivo[1] });
		});
	});

	const expedicionTable = data.map((cultivo) => {
		if (Object.keys(cultivo).length > 1) {
			return {
				CULTIVO: cultivo.cultivo,
				"GRAVEDAD PROGRAMADA": cultivo.supGravedadProgramada,
				"GRAVEDAD EXPEDIDA": cultivo.supGravedadExpedida,
				"GRAVEDAD REALIZADA": cultivo.supGravedadRealizada,
				"POZO PROGRAMADA": cultivo.supPozoProgramada,
				"POZO EXPEDIDA": cultivo.supPozoExpedida,
				"POZO REALIZADA": cultivo.supPozoRealizada,
				"POZO PART PROGRAMADA": cultivo.supPozoPartProgramada,
				"POZO PART EXPEDIDA": cultivo.supPozoPartExpedida,
				"POZO PART REALIZADA": cultivo.supPozoPartRealizada,
				"TOTAL PROGRAMADA":
					cultivo.supGravedadProgramada + cultivo.supPozoProgramada + cultivo.supPozoPartProgramada,
				"TOTAL EXPEDIDA":
					cultivo.supGravedadExpedida + cultivo.supPozoExpedida + cultivo.supPozoPartExpedida,
				"TOTAL REALIZADA":
					cultivo.supGravedadRealizada + cultivo.supPozoRealizada + cultivo.supPozoPartRealizada
			};
		} else {
			return { CULTIVO: cultivo.cultivo };
		}
	});

	return expedicionTable;
};

const setTitle = (modulos) => {
	switch (modulos.length) {
		case 0:
			return "ExpedicionGlobal";
		case 1:
			return `ExpedicionM${modulos[0]}`;

		default:
			return "Expedicion";
	}
};
