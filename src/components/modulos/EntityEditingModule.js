import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

export const EntityEditingModule = () => {
	const { entities } = useSelector((state) => state.entidades);

	const [formValues, handleInputChange] = useForm(entities);

	console.log(formValues);

	return (
		<div>
			<h2 className="mb-5">Edición de entidades</h2>
			<form>
				{entities.map((entitie) => {
					return (
						<div key={entitie.clave} className="d-flex flex-column mb-5">
							<h5>{entitie.nombre}</h5>
							<div className="row">
								<div className="col-sm-8">
									<div className="d-flex">
										<label
											className="align-self-center col-sm-3"
											htmlFor={`titular${entitie.clave}`}
										>
											Titular:
										</label>
										<input
											type="text"
											className="form-control ml-2"
											id={`titular${entitie.clave}`}
											name={`titular${entitie.clave}`}
											autoComplete="off"
											value={entitie.titular}
											onChange={handleInputChange}
										/>
									</div>

									<div className="d-flex">
										<label
											className="align-self-center col-sm-3"
											htmlFor={`direccion${entitie.clave}`}
										>
											Direccion:
										</label>
										<input
											type="text"
											className="form-control ml-2"
											id={`direccion${entitie.clave}`}
											name={`direccion${entitie.clave}`}
											autoComplete="off"
											value={entitie.direccion}
											onChange={handleInputChange}
										/>
									</div>
								</div>

								<div className="col-sm-4">
									<h5>Botones</h5>
								</div>
							</div>
						</div>
					);
				})}
			</form>
		</div>
	);
};
