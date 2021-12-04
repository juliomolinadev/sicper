import React from "react";
import { useSelector } from "react-redux";
import { roundToN } from "../../../helpers/functions/roundToN";

export const CultivoSelected = () => {
	const { nombreCultivo, claveCultivo, subciclo, superficiePreviaCultivo, sistema } = useSelector(
		(state) => state.altaPermisos
	);

	const { autorizadosPorCultivo } = useSelector((state) => state.autorizadosScreen);

	return (
		<div className="border rounded mb-4 p-2">
			<div className="row">
				<div className="col-sm-12 d-inline-flex">
					<div className="mr-4">Cultivo: {nombreCultivo}</div>
					<div className="mr-4">Clave: {claveCultivo}</div>
					<div className="mr-4">Subciclo: {subciclo}</div>
				</div>
			</div>

			<div className="row mt-4">
				<div className="col-sm-12">
					<div className="table-responsive">
						<table className="table table-sm">
							<thead>
								<tr>
									<th scope="col">Superficie</th>
									<th scope="col" className="text-center">
										Autorizada
									</th>
									<th scope="col" className="text-center">
										Asignada
									</th>
									<th scope="col" className="text-center">
										Expedida
									</th>
									<th scope="col" className="text-center">
										Disponible
									</th>
								</tr>
							</thead>

							<tbody>
								{sistema === "Gravedad" && (
									<>
										<tr>
											<th scope="row">Gravedad Normal</th>
											<td className="text-center">
												{autorizadosPorCultivo.gravedadNormalAutorizada}
											</td>
											<td className="text-center">
												{autorizadosPorCultivo.gravedadNormalAsignada}
											</td>
											<td className="text-center">
												{roundToN(superficiePreviaCultivo.gravedadNormal, 4)}
											</td>
											{roundToN(
												autorizadosPorCultivo.gravedadNormalAsignada -
													superficiePreviaCultivo.gravedadNormal,
												4
											) <= 0 ? (
												<td className="text-center text-danger">
													{roundToN(
														autorizadosPorCultivo.gravedadNormalAsignada -
															superficiePreviaCultivo.gravedadNormal,
														4
													)}
												</td>
											) : (
												<td className="text-center">
													{roundToN(
														autorizadosPorCultivo.gravedadNormalAsignada -
															superficiePreviaCultivo.gravedadNormal,
														4
													)}
												</td>
											)}
										</tr>

										<tr>
											<th scope="row">Gravedad Extra</th>
											<td className="text-center">
												{autorizadosPorCultivo.gravedadExtraAutorizada}
											</td>
											<td className="text-center">{autorizadosPorCultivo.gravedadExtraAsignada}</td>
											<td className="text-center">
												{roundToN(superficiePreviaCultivo.gravedadExtra, 4)}
											</td>
											{roundToN(
												autorizadosPorCultivo.gravedadExtraAsignada -
													superficiePreviaCultivo.gravedadExtra,
												4
											) <= 0 ? (
												<td className="text-center text-danger">
													{roundToN(
														autorizadosPorCultivo.gravedadExtraAsignada -
															superficiePreviaCultivo.gravedadExtra,
														4
													)}
												</td>
											) : (
												<td className="text-center">
													{roundToN(
														autorizadosPorCultivo.gravedadExtraAsignada -
															superficiePreviaCultivo.gravedadExtra,
														4
													)}
												</td>
											)}
										</tr>
									</>
								)}

								{sistema === "Pozo Federal" && (
									<>
										<tr>
											<th scope="row">Pozo Normal</th>
											<td className="text-center">{autorizadosPorCultivo.pozoNormalAutorizada}</td>
											<td className="text-center">{autorizadosPorCultivo.pozoNormalAsignada}</td>
											<td className="text-center">
												{roundToN(superficiePreviaCultivo.pozoNormal, 4)}
											</td>
											{roundToN(
												autorizadosPorCultivo.pozoNormalAsignada -
													superficiePreviaCultivo.pozoNormal,
												4
											) <= 0 ? (
												<td className="text-center text-danger">
													{roundToN(
														autorizadosPorCultivo.pozoNormalAsignada -
															superficiePreviaCultivo.pozoNormal,
														4
													)}
												</td>
											) : (
												<td className="text-center">
													{roundToN(
														autorizadosPorCultivo.pozoNormalAsignada -
															superficiePreviaCultivo.pozoNormal,
														4
													)}
												</td>
											)}
										</tr>
										<tr>
											<th scope="row">Pozo Extra</th>
											<td className="text-center">{autorizadosPorCultivo.pozoExtraAutorizada}</td>
											<td className="text-center">{autorizadosPorCultivo.pozoExtraAsignada}</td>
											<td className="text-center">
												{roundToN(superficiePreviaCultivo.pozoExtra, 4)}
											</td>
											{roundToN(
												autorizadosPorCultivo.pozoExtraAsignada - superficiePreviaCultivo.pozoExtra,
												4
											) <= 0 ? (
												<td className="text-center text-danger">
													{roundToN(
														autorizadosPorCultivo.pozoExtraAsignada -
															superficiePreviaCultivo.pozoExtra,
														4
													)}
												</td>
											) : (
												<td className="text-center">
													{roundToN(
														autorizadosPorCultivo.pozoExtraAsignada -
															superficiePreviaCultivo.pozoExtra,
														4
													)}
												</td>
											)}
										</tr>
									</>
								)}
								{sistema === "Pozo Particular" && (
									<>
										<tr>
											<th scope="row">Pozo Normal</th>
											<td className="text-center">{autorizadosPorCultivo.pozoNormalAutorizada}</td>
											<td className="text-center">{autorizadosPorCultivo.pozoNormalAsignada}</td>
											<td className="text-center">
												{roundToN(superficiePreviaCultivo.pozoParticularNormal, 4)}
											</td>
											{roundToN(
												autorizadosPorCultivo.pozoNormalAsignada -
													superficiePreviaCultivo.pozoParticularNormal,
												4
											) <= 0 ? (
												<td className="text-center text-danger">
													{roundToN(
														autorizadosPorCultivo.pozoNormalAsignada -
															superficiePreviaCultivo.pozoParticularNormal,
														4
													)}
												</td>
											) : (
												<td className="text-center">
													{roundToN(
														autorizadosPorCultivo.pozoNormalAsignada -
															superficiePreviaCultivo.pozoParticularNormal,
														4
													)}
												</td>
											)}
										</tr>
										<tr>
											<th scope="row">Pozo Extra</th>
											<td className="text-center">{autorizadosPorCultivo.pozoExtraAutorizada}</td>
											<td className="text-center">{autorizadosPorCultivo.pozoExtraAsignada}</td>
											<td className="text-center">
												{roundToN(superficiePreviaCultivo.pozoParticularExtra, 4)}
											</td>
											{roundToN(
												autorizadosPorCultivo.pozoExtraAsignada -
													superficiePreviaCultivo.pozoParticularExtra,
												4
											) <= 0 ? (
												<td className="text-center text-danger">
													{roundToN(
														autorizadosPorCultivo.pozoExtraAsignada -
															superficiePreviaCultivo.pozoParticularExtra,
														4
													)}
												</td>
											) : (
												<td className="text-center">
													{roundToN(
														autorizadosPorCultivo.pozoExtraAsignada -
															superficiePreviaCultivo.pozoParticularExtra,
														4
													)}
												</td>
											)}
										</tr>
									</>
								)}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
};
