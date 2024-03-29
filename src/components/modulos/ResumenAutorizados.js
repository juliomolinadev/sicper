import React, { useEffect } from "react";
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

	const auth = useSelector((state) => state.auth);
	const ciclo = auth.variablesGlobales.cicloActual;

	useEffect(() => {
		dispatch(startLoadExpedicion(modulo, ciclo));
	}, [dispatch, modulo, ciclo]);

	const setNormal = () => {
		dispatch(setSuperficieNormal());
	};

	const setExtra = () => {
		dispatch(setSuperficieExtra());
	};

	const isModulo = (modulo) => {
		switch (modulo) {
			case "UNI01":
			case "UNI02":
			case "UNI03":
				return false;

			default:
				return true;
		}
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
												<div className="text-center">
													{roundToN(cultivo.gravedadNormalAutorizada, 3)}
												</div>
												<div className="text-center">
													{roundToN(cultivo.pozoNormalAutorizada, 3)}
												</div>
											</td>
											<td>
												<div className="text-center">
													{roundToN(cultivo.gravedadNormalAsignada, 3)}
												</div>
												<div className="text-center">{roundToN(cultivo.pozoNormalAsignada, 3)}</div>
											</td>
											<td>
												<div className="text-center">{roundToN(cultivo.gravedadNormal, 3)}</div>
												{isModulo(modulo) ? (
													<div className="text-center">{roundToN(cultivo.pozoNormal, 3)}</div>
												) : (
													<div className="text-center">
														{roundToN(cultivo.pozoParticularNormal, 3)}
													</div>
												)}
											</td>
											<td>
												<div className="text-center">
													{roundToN(cultivo.gravedadNormalAsignada - cultivo.gravedadNormal, 3)}
												</div>
												{isModulo(modulo) ? (
													<div className="text-center">
														{roundToN(cultivo.pozoNormalAsignada - cultivo.pozoNormal, 3)}
													</div>
												) : (
													<div className="text-center">
														{roundToN(cultivo.pozoNormalAsignada - cultivo.pozoParticularNormal, 3)}
													</div>
												)}
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
												<div className="text-center">
													{roundToN(cultivo.gravedadExtraAutorizada, 3)}
												</div>
												<div className="text-center">
													{roundToN(cultivo.pozoExtraAutorizada, 3)}
												</div>
											</td>
											<td>
												<div className="text-center">
													{roundToN(cultivo.gravedadExtraAsignada, 3)}
												</div>
												<div className="text-center">{roundToN(cultivo.pozoExtraAsignada, 3)}</div>
											</td>
											<td>
												<div className="text-center">{roundToN(cultivo.gravedadExtra, 3)}</div>
												<div className="text-center">{roundToN(cultivo.pozoExtra, 3)}</div>
											</td>
											<td>
												<div className="text-center">
													{roundToN(cultivo.gravedadExtraAsignada - cultivo.gravedadExtra, 3)}
												</div>
												<div className="text-center">
													{roundToN(cultivo.pozoExtraAsignada - cultivo.pozoExtra, 3)}
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
