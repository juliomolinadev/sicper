import React from "react";

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
							GRAVEDAD
						</th>
						<th scope="row" colSpan="3">
							POZO FEDERAL
						</th>
						<th scope="row" colSpan="3">
							POZO PARTICULAR
						</th>
						<th scope="row" colSpan="3">
							TOTAL
						</th>
					</tr>
					<tr>
						<th scope="col">Sup. Prog.</th>
						<th scope="col">Sup. Expedida</th>
						<th scope="col">Realizado</th>
						<th scope="col">Sup. Prog.</th>
						<th scope="col">Sup. Expedida</th>
						<th scope="col">Realizado</th>
						<th scope="col">Sup. Prog.</th>
						<th scope="col">Sup. Expedida</th>
						<th scope="col">Realizado</th>
						<th scope="col">Sup. Prog.</th>
						<th scope="col">Sup. Expedida</th>
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
								<td className="text-right">{cultivo.supGravedadProgramada}</td>
								<td className="text-right">{cultivo.supGravedadExpedida}</td>
								<td className="text-right">{cultivo.supGravedadRealizada}</td>
								<td className="text-right">{cultivo.supPozoProgramada}</td>
								<td className="text-right">{cultivo.supPozoExpedida}</td>
								<td className="text-right">{cultivo.supPozoRealizada}</td>
								<td className="text-right">{cultivo.supPozoPartProgramada}</td>
								<td className="text-right">{cultivo.supPozoPartExpedida}</td>
								<td className="text-right">{cultivo.supPozoPartRealizada}</td>

								<td className="text-right">
									{cultivo.supGravedadProgramada +
										cultivo.supPozoProgramada +
										cultivo.supPozoPartProgramada}
								</td>
								<td className="text-right">
									{cultivo.supGravedadExpedida +
										cultivo.supPozoExpedida +
										cultivo.supPozoPartExpedida}
								</td>
								<td className="text-right">
									{cultivo.supGravedadRealizada +
										cultivo.supPozoRealizada +
										cultivo.supPozoPartRealizada}
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
								<td className="text-right">{cultivo.supGravedadProgramada}</td>
								<td className="text-right">{cultivo.supGravedadExpedida}</td>
								<td className="text-right">{cultivo.supGravedadRealizada}</td>
								<td className="text-right">{cultivo.supPozoProgramada}</td>
								<td className="text-right">{cultivo.supPozoExpedida}</td>
								<td className="text-right">{cultivo.supPozoRealizada}</td>
								<td className="text-right">{cultivo.supPozoPartProgramada}</td>
								<td className="text-right">{cultivo.supPozoPartExpedida}</td>
								<td className="text-right">{cultivo.supPozoPartRealizada}</td>

								<td className="text-right">
									{cultivo.supGravedadProgramada +
										cultivo.supPozoProgramada +
										cultivo.supPozoPartProgramada}
								</td>
								<td className="text-right">
									{cultivo.supGravedadExpedida +
										cultivo.supPozoExpedida +
										cultivo.supPozoPartExpedida}
								</td>
								<td className="text-right">
									{cultivo.supGravedadRealizada +
										cultivo.supPozoRealizada +
										cultivo.supPozoPartRealizada}
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
								<td className="text-right">{cultivo.supGravedadProgramada}</td>
								<td className="text-right">{cultivo.supGravedadExpedida}</td>
								<td className="text-right">{cultivo.supGravedadRealizada}</td>
								<td className="text-right">{cultivo.supPozoProgramada}</td>
								<td className="text-right">{cultivo.supPozoExpedida}</td>
								<td className="text-right">{cultivo.supPozoRealizada}</td>
								<td className="text-right">{cultivo.supPozoPartProgramada}</td>
								<td className="text-right">{cultivo.supPozoPartExpedida}</td>
								<td className="text-right">{cultivo.supPozoPartRealizada}</td>

								<td className="text-right">
									{cultivo.supGravedadProgramada +
										cultivo.supPozoProgramada +
										cultivo.supPozoPartProgramada}
								</td>
								<td className="text-right">
									{cultivo.supGravedadExpedida +
										cultivo.supPozoExpedida +
										cultivo.supPozoPartExpedida}
								</td>
								<td className="text-right">
									{cultivo.supGravedadRealizada +
										cultivo.supPozoRealizada +
										cultivo.supPozoPartRealizada}
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
