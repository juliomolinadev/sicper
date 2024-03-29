import React from "react";
import { useSelector } from "react-redux";

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
								{sistema !== "Pozo Federal" && sistema !== "Pozo Particular" && (
									<>
										<tr>
											<th scope="row">Gravedad Normal</th>
											<td className="text-center">
												{autorizadosPorCultivo.gravedadNormalAutorizada}
											</td>
											<td className="text-center">
												{autorizadosPorCultivo.gravedadNormalAsignada}
											</td>
											<td className="text-center">{superficiePreviaCultivo.gravedadNormal}</td>
											{autorizadosPorCultivo.gravedadNormalAsignada -
												superficiePreviaCultivo.gravedadNormal <=
											0 ? (
												<td className="text-center text-danger">
													{autorizadosPorCultivo.gravedadNormalAsignada -
														superficiePreviaCultivo.gravedadNormal}
												</td>
											) : (
												<td className="text-center">
													{autorizadosPorCultivo.gravedadNormalAsignada -
														superficiePreviaCultivo.gravedadNormal}
												</td>
											)}
										</tr>

										<tr>
											<th scope="row">Gravedad Extra</th>
											<td className="text-center">
												{autorizadosPorCultivo.gravedadExtraAutorizada}
											</td>
											<td className="text-center">{autorizadosPorCultivo.gravedadExtraAsignada}</td>
											<td className="text-center">{superficiePreviaCultivo.gravedadExtra}</td>
											{autorizadosPorCultivo.gravedadExtraAsignada -
												superficiePreviaCultivo.gravedadExtra <=
											0 ? (
												<td className="text-center text-danger">
													{autorizadosPorCultivo.gravedadExtraAsignada -
														superficiePreviaCultivo.gravedadExtra}
												</td>
											) : (
												<td className="text-center">
													{autorizadosPorCultivo.gravedadExtraAsignada -
														superficiePreviaCultivo.gravedadExtra}
												</td>
											)}
										</tr>
									</>
								)}

								{sistema !== "Gravedad" && (
									<>
										<tr>
											<th scope="row">Pozo Normal</th>
											<td className="text-center">{autorizadosPorCultivo.pozoNormalAutorizada}</td>
											<td className="text-center">{autorizadosPorCultivo.pozoNormalAsignada}</td>
											<td className="text-center">{superficiePreviaCultivo.pozoNormal}</td>
											{autorizadosPorCultivo.pozoNormalAsignada -
												superficiePreviaCultivo.pozoNormal <=
											0 ? (
												<td className="text-center text-danger">
													{autorizadosPorCultivo.pozoNormalAsignada -
														superficiePreviaCultivo.pozoNormal}
												</td>
											) : (
												<td className="text-center">
													{autorizadosPorCultivo.pozoNormalAsignada -
														superficiePreviaCultivo.pozoNormal}
												</td>
											)}
										</tr>
										<tr>
											<th scope="row">Pozo Extra</th>
											<td className="text-center">{autorizadosPorCultivo.pozoExtraAutorizada}</td>
											<td className="text-center">{autorizadosPorCultivo.pozoExtraAsignada}</td>
											<td className="text-center">{superficiePreviaCultivo.pozoExtra}</td>
											{autorizadosPorCultivo.pozoExtraAsignada -
												superficiePreviaCultivo.pozoExtra <=
											0 ? (
												<td className="text-center text-danger">
													{autorizadosPorCultivo.pozoExtraAsignada -
														superficiePreviaCultivo.pozoExtra}
												</td>
											) : (
												<td className="text-center">
													{autorizadosPorCultivo.pozoExtraAsignada -
														superficiePreviaCultivo.pozoExtra}
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
