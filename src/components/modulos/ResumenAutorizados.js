import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setSuperficieExtra,
	setSuperficieNormal,
	startLoadExpedicion
} from "../../actions/sicperScreen";
import { roundToN } from "../../helpers/functions/roundToN";

export const ResumenAutorizados = () => {
	const { expedicion, superficie } = useSelector((state) => state.sicperScreen);
	const { modulo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	// TODO: crear funcion para definir ciclo
	const ciclo = "2020-2021";

	if (expedicion === null) {
		dispatch(startLoadExpedicion(modulo, ciclo));
	}

	const setNormal = () => {
		dispatch(setSuperficieNormal());
	};

	const setExtra = () => {
		dispatch(setSuperficieExtra());
	};

	return (
		<div>
			<div className="d-flex justify-content-center">
				<div className="btn-group" role="group">
					{superficie === "normal" ? (
						<button type="button" className="btn btn-info" onClick={setNormal}>
							Superficie Normal
						</button>
					) : (
						<button type="button" className="btn btn-outline-info" onClick={setNormal}>
							Superficie Normal
						</button>
					)}

					{superficie === "extra" ? (
						<button type="button" className="btn btn-info" onClick={setExtra}>
							Superficie Extra
						</button>
					) : (
						<button type="button" className="btn btn-outline-info" onClick={setExtra}>
							Superficie Extra
						</button>
					)}
				</div>
			</div>

			<div className="border border-info rounded p-0 mt-3">
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
													{roundToN(cultivo.gravedadNormalAsignada - cultivo.gravedadNormal, 3)}
												</div>
												<div className="text-center">
													{roundToN(cultivo.pozoNormalAsignada - cultivo.pozoNormal, 3)}
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
	);
};
