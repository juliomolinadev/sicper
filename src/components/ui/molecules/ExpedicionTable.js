import React from "react";
import { roundToN } from "../../../helpers/functions/roundToN";

export const ExpedicionTable = ({ data }) => {
	return (
		<div className="table-responsive-sm">
			<table className="table table-sm table-bordered font12">
				<thead>
					<tr>
						<th scope="row" rowSpan="2">
							CULTIVO
						</th>
						<th scope="row" colSpan="3">
							SUP. GRAVEDAD (ha)
						</th>
						<th scope="row" colSpan="3">
							SUP. POZO FEDERAL (ha)
						</th>
						<th scope="row" colSpan="3">
							SUP. POZO PARTICULAR (ha)
						</th>
						<th scope="row" colSpan="3">
							SUP. TOTAL (ha)
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
				</tbody>
			</table>
		</div>
	);
};
