import React from "react";

export const ExpedicionTable = ({ data }) => {
	return (
		<div className="table-responsive-sm">
			<table className="table table-sm table-bordered font12">
				<thead className="thead-light">
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
						<th scope="col">S. Prog.</th>
						<th scope="col">S. Expedida</th>
						<th scope="col">Realizado</th>
						<th scope="col">S. Prog.</th>
						<th scope="col">S. Expedida</th>
						<th scope="col">Realizado</th>
						<th scope="col">S. Prog.</th>
						<th scope="col">S. Expedida</th>
						<th scope="col">Realizado</th>
						<th scope="col">S. Prog.</th>
						<th scope="col">S. Expedida</th>
						<th scope="col">Realizado</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<th scope="row" colSpan="13">
							OTOÑO - INVIERNO
						</th>
					</tr>
					{Object.values(data["OTOÑO-INVIERNO"]).map((cultivo, i) => {
						const nombreCultivo = Object.keys(data["OTOÑO-INVIERNO"])[i];

						return (
							<tr key={nombreCultivo}>
								<th scope="row">{nombreCultivo}</th>
								<td>{cultivo.supGravedadProgramada}</td>
								<td>{cultivo.supGravedadExpedida}</td>
								<td>{cultivo.supGravedadRealizada}</td>
								<td>{cultivo.supPozoProgramada}</td>
								<td>{cultivo.supPozoExpedida}</td>
								<td>{cultivo.supPozoRealizada}</td>
								<td>{cultivo.supPozoPartProgramada}</td>
								<td>{cultivo.supPozoPartExpedida}</td>
								<td>{cultivo.supPozoPartRealizada}</td>

								<td>
									{cultivo.supGravedadProgramada +
										cultivo.supPozoProgramada +
										cultivo.supPozoPartProgramada}
								</td>
								<td>
									{cultivo.supGravedadExpedida +
										cultivo.supPozoExpedida +
										cultivo.supPozoPartExpedida}
								</td>
								<td>
									{cultivo.supGravedadRealizada +
										cultivo.supPozoRealizada +
										cultivo.supPozoPartRealizada}
								</td>
							</tr>
						);
					})}

					<tr>
						<th scope="row" colSpan="13">
							PERENNES
						</th>
					</tr>
					{Object.values(data["PERENNES"]).map((cultivo, i) => {
						const nombreCultivo = Object.keys(data["PERENNES"])[i];

						return (
							<tr key={nombreCultivo}>
								<th scope="row">{nombreCultivo}</th>
								<td>{cultivo.supGravedadProgramada}</td>
								<td>{cultivo.supGravedadExpedida}</td>
								<td>{cultivo.supGravedadRealizada}</td>
								<td>{cultivo.supPozoProgramada}</td>
								<td>{cultivo.supPozoExpedida}</td>
								<td>{cultivo.supPozoRealizada}</td>
								<td>{cultivo.supPozoPartProgramada}</td>
								<td>{cultivo.supPozoPartExpedida}</td>
								<td>{cultivo.supPozoPartRealizada}</td>

								<td>
									{cultivo.supGravedadProgramada +
										cultivo.supPozoProgramada +
										cultivo.supPozoPartProgramada}
								</td>
								<td>
									{cultivo.supGravedadExpedida +
										cultivo.supPozoExpedida +
										cultivo.supPozoPartExpedida}
								</td>
								<td>
									{cultivo.supGravedadRealizada +
										cultivo.supPozoRealizada +
										cultivo.supPozoPartRealizada}
								</td>
							</tr>
						);
					})}

					<tr>
						<th scope="row" colSpan="13">
							PRIMAVERA-VERANO
						</th>
					</tr>
					{Object.values(data["PRIMAVERA-VERANO"]).map((cultivo, i) => {
						const nombreCultivo = Object.keys(data["PRIMAVERA-VERANO"])[i];

						return (
							<tr key={nombreCultivo}>
								<th scope="row">{nombreCultivo}</th>
								<td>{cultivo.supGravedadProgramada}</td>
								<td>{cultivo.supGravedadExpedida}</td>
								<td>{cultivo.supGravedadRealizada}</td>
								<td>{cultivo.supPozoProgramada}</td>
								<td>{cultivo.supPozoExpedida}</td>
								<td>{cultivo.supPozoRealizada}</td>
								<td>{cultivo.supPozoPartProgramada}</td>
								<td>{cultivo.supPozoPartExpedida}</td>
								<td>{cultivo.supPozoPartRealizada}</td>

								<td>
									{cultivo.supGravedadProgramada +
										cultivo.supPozoProgramada +
										cultivo.supPozoPartProgramada}
								</td>
								<td>
									{cultivo.supGravedadExpedida +
										cultivo.supPozoExpedida +
										cultivo.supPozoPartExpedida}
								</td>
								<td>
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
