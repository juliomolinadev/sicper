import React from "react";
import { useSelector } from "react-redux";
import { roundToN } from "../../../helpers/functions/roundToN";

export const CultivoSelected = () => {
	const { claveCultivo, superficiePreviaCultivo, sistema, cultivos, supDerecho, supPrevia } =
		useSelector((state) => state.altaPermisos);

	const cultivoSelected = cultivos.find((cultivo) => cultivo.clave === claveCultivo);

	const { autorizadosPorCultivo } = useSelector((state) => state.autorizadosScreen);

	return (
		<div className="border rounded mb-4 p-2">
			{cultivoSelected.requiereComplementoVolumen && (
				<div className="row mt-4 ml-3">
					<div className="col-sm-12">
						<div className="text-warning"> "REQUIERE COMPLEMENTO DE VOLUMEN"</div>
						<div className="">
							Complemento de volumen requerido por hectárea de cultivo:{" "}
							{cultivoSelected.complementoPorHa} (Ha)
						</div>
						{supDerecho && (
							<>
								<div className="">
									Superficie máxima de cultivo con la dotación disponible de la cuenta:{" "}
									{roundToN((supDerecho - supPrevia) / (cultivoSelected.complementoPorHa + 1), 1)}{" "}
									(Ha)
								</div>

								<div className="">
									Complemento de volumen necesario para establecer la superficie disponible de la
									cuenta: {roundToN((supDerecho - supPrevia) * cultivoSelected.complementoPorHa, 1)}{" "}
									(Ha)
								</div>
							</>
						)}
					</div>
				</div>
			)}

			{autorizadosPorCultivo.map((cultivo) => (
				<div key={cultivo.clave}>
					<div className="row mt-4">
						<div className="col-sm-12 d-inline-flex">
							<div className="mr-4">Cultivo: {cultivo.cultivo}</div>
							<div className="mr-4">Clave: {cultivo.clave}</div>
							<div className="mr-4">Subciclo: {cultivo.subciclo}</div>
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
													<td className="text-center">{cultivo.gravedadNormalAutorizada}</td>
													<td className="text-center">{cultivo.gravedadNormalAsignada}</td>
													<td className="text-center">
														{roundToN(superficiePreviaCultivo.gravedadNormal, 4)}
													</td>
													{roundToN(
														cultivo.gravedadNormalAsignada - superficiePreviaCultivo.gravedadNormal,
														4
													) <= 0 ? (
														<td className="text-center text-danger">
															{roundToN(
																cultivo.gravedadNormalAsignada -
																	superficiePreviaCultivo.gravedadNormal,
																4
															)}
														</td>
													) : (
														<td className="text-center">
															{roundToN(
																cultivo.gravedadNormalAsignada -
																	superficiePreviaCultivo.gravedadNormal,
																4
															)}
														</td>
													)}
												</tr>

												<tr>
													<th scope="row">Gravedad Extra</th>
													<td className="text-center">{cultivo.gravedadExtraAutorizada}</td>
													<td className="text-center">{cultivo.gravedadExtraAsignada}</td>
													<td className="text-center">
														{roundToN(superficiePreviaCultivo.gravedadExtra, 4)}
													</td>
													{roundToN(
														cultivo.gravedadExtraAsignada - superficiePreviaCultivo.gravedadExtra,
														4
													) <= 0 ? (
														<td className="text-center text-danger">
															{roundToN(
																cultivo.gravedadExtraAsignada -
																	superficiePreviaCultivo.gravedadExtra,
																4
															)}
														</td>
													) : (
														<td className="text-center">
															{roundToN(
																cultivo.gravedadExtraAsignada -
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
													<td className="text-center">{cultivo.pozoNormalAutorizada}</td>
													<td className="text-center">{cultivo.pozoNormalAsignada}</td>
													<td className="text-center">
														{roundToN(superficiePreviaCultivo.pozoNormal, 4)}
													</td>
													{roundToN(
														cultivo.pozoNormalAsignada - superficiePreviaCultivo.pozoNormal,
														4
													) <= 0 ? (
														<td className="text-center text-danger">
															{roundToN(
																cultivo.pozoNormalAsignada - superficiePreviaCultivo.pozoNormal,
																4
															)}
														</td>
													) : (
														<td className="text-center">
															{roundToN(
																cultivo.pozoNormalAsignada - superficiePreviaCultivo.pozoNormal,
																4
															)}
														</td>
													)}
												</tr>
												<tr>
													<th scope="row">Pozo Extra</th>
													<td className="text-center">{cultivo.pozoExtraAutorizada}</td>
													<td className="text-center">{cultivo.pozoExtraAsignada}</td>
													<td className="text-center">
														{roundToN(superficiePreviaCultivo.pozoExtra, 4)}
													</td>
													{roundToN(
														cultivo.pozoExtraAsignada - superficiePreviaCultivo.pozoExtra,
														4
													) <= 0 ? (
														<td className="text-center text-danger">
															{roundToN(
																cultivo.pozoExtraAsignada - superficiePreviaCultivo.pozoExtra,
																4
															)}
														</td>
													) : (
														<td className="text-center">
															{roundToN(
																cultivo.pozoExtraAsignada - superficiePreviaCultivo.pozoExtra,
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
													<td className="text-center">{cultivo.pozoNormalAutorizada}</td>
													<td className="text-center">{cultivo.pozoNormalAsignada}</td>
													<td className="text-center">
														{roundToN(superficiePreviaCultivo.pozoParticularNormal, 4)}
													</td>
													{roundToN(
														cultivo.pozoNormalAsignada -
															superficiePreviaCultivo.pozoParticularNormal,
														4
													) <= 0 ? (
														<td className="text-center text-danger">
															{roundToN(
																cultivo.pozoNormalAsignada -
																	superficiePreviaCultivo.pozoParticularNormal,
																4
															)}
														</td>
													) : (
														<td className="text-center">
															{roundToN(
																cultivo.pozoNormalAsignada -
																	superficiePreviaCultivo.pozoParticularNormal,
																4
															)}
														</td>
													)}
												</tr>
												<tr>
													<th scope="row">Pozo Extra</th>
													<td className="text-center">{cultivo.pozoExtraAutorizada}</td>
													<td className="text-center">{cultivo.pozoExtraAsignada}</td>
													<td className="text-center">
														{roundToN(superficiePreviaCultivo.pozoParticularExtra, 4)}
													</td>
													{roundToN(
														cultivo.pozoExtraAsignada - superficiePreviaCultivo.pozoParticularExtra,
														4
													) <= 0 ? (
														<td className="text-center text-danger">
															{roundToN(
																cultivo.pozoExtraAsignada -
																	superficiePreviaCultivo.pozoParticularExtra,
																4
															)}
														</td>
													) : (
														<td className="text-center">
															{roundToN(
																cultivo.pozoExtraAsignada -
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
			))}
		</div>
	);
};
