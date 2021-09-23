import React from "react";
import { useSelector } from "react-redux";
import { actualizarEntidades } from "../../helpers/DB/actualizarEntidades";
import { useFormArray } from "../../hooks/useFormArray";

export const EntityEditingModule = () => {
	const { entities } = useSelector((state) => state.entidades);
	const { privilegios } = useSelector((state) => state.auth);

	const [formValues, handleInputChange] = useFormArray(entities);
	const handleActualizarEntidades = () => {
		actualizarEntidades(formValues);
	};

	return (
		<div>
			<div className="mb-4">
				<h3>Edición de entidades</h3>
			</div>

			{entities !== formValues && privilegios.editarEntidades && (
				<div className="row mb-3 d-flex justify-content-center mt-4">
					<button
						type="button"
						className="btn btn-outline-primary"
						onClick={handleActualizarEntidades}
					>
						<span> Actualizar Entidades</span>
					</button>
				</div>
			)}
			<form>
				{entities.map((entitie, i) => {
					if (entitie.clave !== "dev") {
						return (
							<div key={entitie.clave} className="d-flex flex-column mb-5">
								<h5>{entitie.nombre}</h5>
								<div className="row">
									<div className="col-sm-2 mt-3 h-100 d-flex justify-content-center align-items-center">
										<img
											className="align-self-center"
											src={`./logos/${entitie.img}`}
											alt="Logo de la entidad"
											style={{ maxHeight: 70, maxWidth: 100 }}
										/>
									</div>

									<div className="col-sm-8 mt-3">
										<div className="d-flex">
											<label className="align-self-center col-sm-2" htmlFor={`${i}-titular`}>
												Titular:
											</label>
											<input
												type="text"
												className="form-control ml-2"
												id={`${i}-titular`}
												name={`${i}-titular`}
												autoComplete="off"
												value={formValues[i].titular}
												onChange={handleInputChange}
											/>
										</div>

										<div className="d-flex mt-2">
											<label className="align-self-center col-sm-2" htmlFor={`${i}-direccion`}>
												Direccion:
											</label>
											<input
												type="text"
												className="form-control ml-2"
												id={`${i}-direccion`}
												name={`${i}-direccion`}
												autoComplete="off"
												value={entities[i].direccion}
												onChange={handleInputChange}
											/>
										</div>
									</div>

									{privilegios.cerrarExpedicionModulos &&
										entitie.clave !== "SADER" &&
										entitie.clave !== "CNA" &&
										entitie.clave !== "SRL" &&
										entitie.clave !== "CESVBC" && (
											<div className="col-sm-2 mt-3">
												Expedición:
												<div className="btn-group" role="group">
													<button
														type="button"
														name={`${i}-expedicionActivaModulo`}
														className={
															entities[i].expedicionActivaModulo
																? "btn btn-primary"
																: "btn btn-outline-primary"
														}
														onClick={handleInputChange}
													>
														Activa
													</button>

													<button
														type="button"
														name={`${i}-expedicionActivaModulo`}
														className={
															entities[i].expedicionActivaModulo
																? "btn btn-outline-primary"
																: "btn btn-primary"
														}
														onClick={handleInputChange}
													>
														Cerrada
													</button>
												</div>
											</div>
										)}
								</div>
							</div>
						);
					} else return <div key={entitie.clave}></div>;
				})}
			</form>
			{entities !== formValues && privilegios.editarEntidades && (
				<div className="mb-3 d-flex justify-content-center mt-4">
					<button
						type="button"
						className="btn btn-outline-primary"
						onClick={handleActualizarEntidades}
					>
						<span> Actualizar Entidades</span>
					</button>
				</div>
			)}
		</div>
	);
};
