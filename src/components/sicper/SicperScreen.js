import React from "react";
import { Link } from "react-router-dom";
import { SuperficiesChart } from "../charts/SuperficiesChart";
import { useDispatch, useSelector } from "react-redux";
import { startLoadSuperficies } from "../../actions/permisosScreen";
import { ResumenAutorizados } from "../autorizados/ResumenAutorizados";
import { startLoadAutorizados } from "../../actions/autorizadosScreen";
import {
	setSuperficieExtra,
	setSuperficieNormal,
	startLoadExpedicion
} from "../../actions/sicperScreen";

export const SicperScreen = () => {
	const dispatch = useDispatch();

	const { superficies } = useSelector((state) => state.permisosScreen);
	const { claveEntidad } = useSelector((state) => state.auth);
	const { autorizados } = useSelector((state) => state.autorizadosScreen);
	const { expedicion, superficie } = useSelector((state) => state.sicperScreen);

	if (autorizados.length === 0) {
		dispatch(startLoadAutorizados(claveEntidad));
	}

	if (expedicion === null) {
		dispatch(startLoadExpedicion(claveEntidad));
	}

	if (superficies === null) {
		dispatch(startLoadSuperficies(claveEntidad));
	}

	const setNormal = () => {
		dispatch(setSuperficieNormal());
	};

	const setExtra = () => {
		dispatch(setSuperficieExtra());
	};

	return (
		<>
			<div className="row pt-5">
				<div className="col-sm-3 pr-4 pt-3">
					<div className="d-flex justify-content-center">
						<Link to="/nuevo-permiso">
							<button className="btn btn-outline-primary" type="button">
								<span>Nuevo Permiso </span>
								<i className="fas fa-plus"></i>
							</button>
						</Link>
					</div>
				</div>

				<div className="col-sm-5 pt-3">
					<div className="d-flex justify-content-center">
						<div className="btn-group" role="group">
							{superficie === "normal" ? (
								<button type="button" className="btn btn-primary" onClick={setNormal}>
									Superficie Normal
								</button>
							) : (
								<button type="button" className="btn btn-outline-primary" onClick={setNormal}>
									Superficie Normal
								</button>
							)}

							{superficie === "extra" ? (
								<button type="button" className="btn btn-primary" onClick={setExtra}>
									Superficie Extra
								</button>
							) : (
								<button type="button" className="btn btn-outline-primary" onClick={setExtra}>
									Superficie Extra
								</button>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="row pt-3 pb-4">
				<div className="col-sm-8">
					<div className="border border-info rounded p-0">
						<div className="table-responsive">
							<table className="table table-sm table-striped text-secondary">
								<thead className="table-info">
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
								{expedicion && superficie === "normal" ? (
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
														<div>Pozo</div>
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
														<div className="text-center">{cultivo.gravedadNormal}</div>
														<div className="text-center">{cultivo.pozoNormal}</div>
													</td>
													<td>
														<div className="text-center">
															{cultivo.gravedadNormalAsignada - cultivo.gravedadNormal}
														</div>
														<div className="text-center">
															{cultivo.pozoNormalAsignada - cultivo.pozoNormal}
														</div>
													</td>
												</tr>
											);
										})}
									</tbody>
								) : (
									<></>
								)}

								{expedicion && superficie === "extra" ? (
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
														<div>Pozo</div>
													</td>
													<td>
														<div className="text-center">{cultivo.gravedadExtraAutorizada}</div>
														<div className="text-center">{cultivo.pozoExtraAutorizada}</div>
													</td>
													<td>
														<div className="text-center">{cultivo.gravedadExtraAsignada}</div>
														<div className="text-center">{cultivo.pozoExtraAsignada}</div>
													</td>
													<td>
														<div className="text-center">{cultivo.gravedadExtra}</div>
														<div className="text-center">{cultivo.pozoExtra}</div>
													</td>
													<td>
														<div className="text-center">
															{cultivo.gravedadExtraAsignada - cultivo.gravedadExtra}
														</div>
														<div className="text-center">
															{cultivo.pozoExtraAsignada - cultivo.pozoExtra}
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
					<div className="border border-info rounded detallePermiso text-secondary">
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
