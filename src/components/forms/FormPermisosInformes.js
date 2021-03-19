import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { useForm } from "../../hooks/useForm";
import { startLoadPermisos } from "../../actions/entidades/permisos";

export const FormPermisosInformes = () => {
	const dispatch = useDispatch();

	const { claveEntidad } = useSelector((state) => state.auth);
	const [formValues, handleInputChange] = useForm({ palabra: "" });
	const { palabra, campo, activosCancelados, tipoSuperficie, sistema } = formValues;

	// TODO: crear funcion para definir ciclo
	const ciclo = "2020-2021";

	const buscarPermisos = () => {
		if (campo) {
			dispatch(
				startLoadPermisos(
					palabra,
					claveEntidad,
					ciclo,
					[campo],
					activosCancelados,
					tipoSuperficie,
					sistema
				)
			);
		} else {
			Swal.fire("Nada para buscar", "Seleccione un campo.", "warning");
		}
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			buscarPermisos();
		}
	};

	return (
		<div className="row">
			<div className="col-sm-9">
				<div className="row">
					<div className="col-sm-12 d-inline-flex p-0">
						<input
							type="text"
							className="form-control"
							placeholder="parametro de busqueda"
							name="palabra"
							autoComplete="off"
							value={palabra}
							onChange={handleInputChange}
							onKeyUp={handleKeyUp}
						/>

						<select
							name="campo"
							value={campo}
							onChange={handleInputChange}
							className="form-control ml-2"
						>
							<option value="">-</option>
							<option value="usuario">Usuario</option>
							<option value="nombreProductor">Productor</option>
							<option value="nombreCultivo">Cultivo</option>
							<option value="localidad">Localidad</option>
						</select>

						<button
							className=" btn btn-outline-primary d-sm-block ml-2"
							type="button"
							onClick={buscarPermisos}
						>
							<i className="fas fa-search"></i>
						</button>
					</div>
				</div>

				<div className="row justify-content-between pt-2">
					<div className="col-sm-4 border rounded pt-2 pb-2">
						<p>ESTADO DE LOS PERMISOS</p>
						<div className="form-check d-flex flex-column">
							<div>
								<input
									className="form-check-input"
									type="radio"
									name="activosCancelados"
									id="todos"
									value="todos"
									onChange={handleInputChange}
								/>
								<label className="form-check-label" htmlFor="todos">
									Todos los permisos
								</label>
							</div>

							<div>
								<input
									className="form-check-input"
									type="radio"
									name="activosCancelados"
									id="activos"
									value="activo"
									onChange={handleInputChange}
								/>
								<label className="form-check-label" htmlFor="activos">
									Permisos activos
								</label>
							</div>

							<div>
								<input
									className="form-check-input"
									type="radio"
									name="activosCancelados"
									id="cancelados"
									value="cancelado"
									onChange={handleInputChange}
								/>
								<label className="form-check-label" htmlFor="cancelados">
									Permisos cancelados
								</label>
							</div>

							<div>
								<input
									className="form-check-input"
									type="radio"
									name="activosCancelados"
									id="En proceso de cancelación"
									value="En proceso de cancelación"
									onChange={handleInputChange}
								/>
								<label className="form-check-label" htmlFor="En proceso de cancelación">
									En proceso de cancelación
								</label>
							</div>
						</div>
					</div>

					<div className="col-sm-4 border rounded pt-2 pb-2">
						<p>TIPO DE EXPEDICIÓN</p>
						<div className="form-check d-flex flex-column">
							<div>
								<input
									className="form-check-input"
									type="radio"
									name="tipoSuperficie"
									id="toda"
									value="todos"
									onChange={handleInputChange}
								/>
								<label className="form-check-label" htmlFor="toda">
									Toda la superficie
								</label>
							</div>

							<div>
								<input
									className="form-check-input"
									type="radio"
									name="tipoSuperficie"
									id="superficieNormal"
									value="normal"
									onChange={handleInputChange}
								/>
								<label className="form-check-label" htmlFor="superficieNormal">
									Superficie normal
								</label>
							</div>

							<div>
								<input
									className="form-check-input"
									type="radio"
									name="tipoSuperficie"
									id="superficieExtra"
									value="extra"
									onChange={handleInputChange}
								/>
								<label className="form-check-label" htmlFor="superficieExtra">
									Superficie extra
								</label>
							</div>
						</div>
					</div>

					<div className="col-sm-3 border rounded pt-2 pb-2">
						<p>SISTEMA DE RIEGO</p>
						<div className="form-check d-flex flex-column">
							<div>
								<input
									className="form-check-input"
									type="radio"
									name="sistema"
									id="gravedadPozo"
									value="todos"
									onChange={handleInputChange}
								/>
								<label className="form-check-label" htmlFor="gravedadPozo">
									Gravedad y pozo
								</label>
							</div>

							<div>
								<input
									className="form-check-input"
									type="radio"
									name="sistema"
									id="gravedad"
									value="Gravedad"
									onChange={handleInputChange}
								/>
								<label className="form-check-label" htmlFor="gravedad">
									Gravedad
								</label>
							</div>

							<div>
								<input
									className="form-check-input"
									type="radio"
									name="sistema"
									id="pozo"
									value="Pozo"
									onChange={handleInputChange}
								/>
								<label className="form-check-label" htmlFor="pozo">
									Pozo
								</label>
							</div>
						</div>
					</div>
				</div>

				{/* <div className="row justify-content-between border rounded mt-2">
					<div className="col-sm-12 p-2">
						<p>RANGO DE EXPEDICIÓN</p>
					</div>
					<div className="col-sm-5  pb-2">
						<label className="form-check-label" htmlFor="fechaInicial">
							Fecha inicial
						</label>
						<input
							// className="form-check-input"
							type="date"
							name="fechaInicial"
							id="fechaInicial"
							value="fechaInicial"
							onChange={handleInputChange}
						/>
					</div>

					<div className="col-sm-5 pb-2">
						<label className="form-check-label" htmlFor="fechaInicial">
							Fecha final
						</label>
						<input
							// className="form-check-input"
							type="date"
							name="fechaInicial"
							id="fechaInicial"
							value="fechaInicial"
							onChange={handleInputChange}
						/>
					</div>
				</div> */}
			</div>

			<div className="col-sm-3 d-flex flex-column">
				<div className="d-flex">
					<button
						className="btn btn-outline-primary flex-fill"
						type="button"
						// onClick={changeProductorModal}
					>
						<span>Imprimir informe </span>
						<i className="fas fa-print"></i>
					</button>
				</div>

				<div className="pt-3 d-flex">
					<button
						className="btn btn-outline-primary flex-fill"
						type="button"
						// onClick={changeProductorModal}
					>
						<span>Imprimir grafico </span>
						<i className="fas fa-print"></i>
					</button>
				</div>

				<div className="pt-3 d-flex">
					<button
						className="btn btn-outline-primary flex-fill"
						type="button"
						// onClick={changeProductorModal}
					>
						<span>Imprimir informe con grafico </span>
						<i className="fas fa-print"></i>
					</button>
				</div>
			</div>
		</div>
	);
};
