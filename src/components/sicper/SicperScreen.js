import React from "react";
import { Link } from "react-router-dom";
import { SuperficiesChart } from "../charts/SuperficiesChart";
import { useDispatch, useSelector } from "react-redux";
import { startLoadSuperficies } from "../../actions/permisosScreen";
import { ResumenAutorizados } from "../autorizados/ResumenAutorizados";
import { startLoadAutorizados } from "../../actions/autorizadosScreen";
import { startLoadExpedicion } from "../../actions/sicperScreen";

export const SicperScreen = () => {
	const dispatch = useDispatch();

	const { superficies } = useSelector((state) => state.permisosScreen);
	const { claveEntidad } = useSelector((state) => state.auth);
	const { autorizados } = useSelector((state) => state.autorizadosScreen);
	const { expedicion } = useSelector((state) => state.sicperScreen);

	if (autorizados.length === 0) {
		dispatch(startLoadAutorizados(claveEntidad));
	}

	if (expedicion === null) {
		dispatch(startLoadExpedicion(claveEntidad));
	}

	if (superficies === null) {
		dispatch(startLoadSuperficies(claveEntidad));
	}

	return (
		<>
			<div className="row pt-5">
				<div className="col-sm-8 pr-4">
					<div className="row d-flex">
						<div className="col-sm-4">
							<Link to="/nuevo-permiso">
								<button className="btn btn-outline-primary" type="button">
									<span>Nuevo Permiso </span>
									<i className="fas fa-plus"></i>
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="row pt-3 pb-4">
				<div className="col-sm-8">
					<div className="border border-info rounded p-0">
						<div className="table-responsive">
							<table className="table table-sm table-striped">
								<thead>
									<tr>
										<th scope="col" className="text-center">
											Clave
										</th>
										<th scope="col">Cultivo</th>
										<th scope="col">Sistema</th>
										<th scope="col" className="text-center">
											Superficie Autorizada
										</th>
										<th scope="col" className="text-center">
											Superficie Asignada
										</th>
										<th scope="col" className="text-center">
											Superficie Expedida
										</th>
										<th scope="col" className="text-center">
											Superficie Disponible
										</th>
									</tr>
								</thead>
								{expedicion ? (
									<tbody>
										{expedicion.map((cultivo) => {
											return (
												<tr key={`${cultivo.id}-${cultivo.clave}`}>
													<th scope="row" className="text-center">
														{cultivo.clave}
													</th>
													<td>{cultivo.cultivo}</td>
													<td>
														<div>Gravedad</div>
														<div>Pozo Federal</div>
														<div>Pozo Particular</div>
													</td>
													<td>
														<div className="text-center">{cultivo.gravedadNormalAutorizada}</div>
														<div className="text-center">{cultivo.pozoNormalAutorizada}</div>
													</td>
													<td>
														<div className="text-center">{cultivo.gravedadNormalAsignada}</div>
														<div className="text-center">{cultivo.pozoNormalAsignada}</div>
													</td>
													<td>
														<div className="text-center">{cultivo.gravedad}</div>
														<div className="text-center">{cultivo.pozoFederal}</div>
													</td>
													<td>
														<div className="text-center">
															{cultivo.gravedadNormalAsignada - cultivo.gravedad}
														</div>
														<div className="text-center">
															{cultivo.pozoNormalAsignada - cultivo.pozoFederal}
														</div>
													</td>
												</tr>
											);
										})}
									</tbody>
								) : (
									<></>
								)}
							</table>
						</div>
					</div>
				</div>

				<div className="col-sm-4">
					<div className="border border-info rounded detallePermiso">
						<SuperficiesChart />
						{autorizados.length > 0 ? (
							<ResumenAutorizados
								autorizados={autorizados}
								modulo={claveEntidad}
							></ResumenAutorizados>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</>
	);
};
