import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../actions/ui";
import { saveTransfer } from "../../helpers/saveTransfer";
import { startSetUsuarioSelected } from "../../actions/usuarios";
import { ProductorInput2 } from "../permisos/inputsNuevosPermisos/ProductorInput2";
import { CultivoInput2 } from "../permisos/inputsNuevosPermisos/CultivoInput2";
import { LocalidadInput } from "../permisos/inputsNuevosPermisos/LocalidadInput";
import { unsetCultivoSelected } from "../../actions/cultivos";
import { unsetProductorSelected } from "../../actions/productores";
import { unsetLocaltieSelected } from "../../actions/entidades/localidades";

export const TransferForm = () => {
	const { usuario, localtieSelected } = useSelector((state) => state.entidades);
	const { nombreProductor, rfcProductor, nombreCultivo, claveCultivo } = useSelector(
		(state) => state.altaPermisos
	);

	const [
		{ superficieTransferida, loteDestino, moduloDestino, cultivo, productor, localtie },
		handleInputChange,
		reset
	] = useForm({
		superficieTransferida: 0,
		loteDestino: "",
		moduloDestino: "",
		cultivo: "",
		productor: "",
		localtie: ""
	});

	const { msgError } = useSelector((state) => state.ui);

	let superficieDisponible;

	if (usuario) {
		superficieDisponible = usuario.supRiego - usuario.supPrevia;
	}

	const dispatch = useDispatch();

	const isFormValid = () => {
		if (parseInt(superficieTransferida) <= 0) {
			dispatch(setError("Indique superficie a transferir"));
			return false;
		} else if (parseInt(superficieTransferida) > superficieDisponible) {
			dispatch(setError("La superficie a transferir excede a la superficie disponible"));
			return false;
		} else if (moduloDestino.trim().length === 0) {
			// TODO: Verificar que exista el modulo
			dispatch(setError("Indique el módulo destino"));
			return false;
		} else if (loteDestino.trim().length === 0) {
			dispatch(setError("Indique el lote en el que se aplicará la transferencia"));
			return false;
		} else if (rfcProductor === null) {
			dispatch(setError("Indique Productor"));
			return false;
		} else if (nombreCultivo === null) {
			dispatch(setError("Indique Cultivo"));
			return false;
		} else if (localtieSelected === null) {
			dispatch(setError("Indique la localidad destino"));
			return false;
		}
		dispatch(removeError());

		return true;
	};

	// TODO: crear funcion para definir ciclo
	const ciclo = "2020-2021";

	const startSaveTransfer = (e) => {
		e.preventDefault();
		if (isFormValid()) {
			const transfer = {
				superficieTransferida: parseInt(superficieTransferida),
				loteDestino,
				localidadDestino: localtieSelected.nombre,
				clavelocalidadDestino: localtieSelected.clave,
				moduloDestino,
				cuentaOrigen: `${usuario.cuenta}.${usuario.subcta}`,
				usuario: `${usuario.apPaterno} ${usuario.apMaterno} ${usuario.nombre}`,
				loteOrigen: usuario.predio,
				localidadOrigen: usuario.ejido,
				moduloOrigen: usuario.modulo,
				nombreProductor,
				rfcProductor,
				nombreCultivo,
				claveCultivo,
				fecha: new Date()
			};
			saveTransfer(transfer, ciclo);
			dispatch(startSetUsuarioSelected(usuario));
			reset();
			dispatch(unsetCultivoSelected());
			dispatch(unsetProductorSelected());
			dispatch(unsetLocaltieSelected());
		}
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			startSaveTransfer(event);
		}
	};

	if (usuario) {
		return (
			<>
				<div className="row border border-info rounded mt-4 m-1">
					<div className="col-12 d-flex justify-content-center border-bottom border-info p-2">
						<h3>Transferencia</h3>
					</div>

					<div className="col-12 d-flex flex-column p-3">
						<div className="row d-flex p-3 text-warning">* Campos obligatorios</div>

						{/* TODO: resaltar mensaje de error */}
						{msgError && <div className="auth__alert-error">{msgError}</div>}

						<div className=" row d-flex p-3">
							<label htmlFor="">
								<span className="text-warning">* </span>
								Superficie a transferir (ha):
							</label>
							<input
								type="number"
								className="form-control ml-1"
								placeholder="0 ha"
								name="superficieTransferida"
								autoComplete="off"
								value={superficieTransferida}
								onChange={handleInputChange}
								onKeyUp={handleKeyUp}
							/>
						</div>

						<div className="pt-3">
							<CultivoInput2 cultivo={cultivo} handleInputChange={handleInputChange} />
						</div>

						<div className="pt-3">
							<ProductorInput2 productor={productor} handleInputChange={handleInputChange} />
						</div>

						<div className=" row d-flex p-3">
							<label htmlFor="">
								<span className="text-warning">* </span>
								Modulo destino:
							</label>
							<select
								type="text"
								name="moduloDestino"
								value={moduloDestino}
								onChange={handleInputChange}
								className="form-control ml-1"
							>
								<option hidden defaultValue={false}>
									Modulo
								</option>
								<option value="1">Modulo 1</option>
								<option value="2">Modulo 2</option>
								<option value="3">Modulo 3</option>
								<option value="4">Modulo 4</option>
								<option value="5">Modulo 5</option>
								<option value="6">Modulo 6</option>
								<option value="7">Modulo 7</option>
								<option value="8">Modulo 8</option>
								<option value="9">Modulo 9</option>
								<option value="9B">Modulo 9B</option>
								<option value="10">Modulo 10</option>
								<option value="11">Modulo 11</option>
								<option value="12">Modulo 12</option>
								<option value="14">Modulo 14</option>
								<option value="15">Modulo 15</option>
								<option value="16">Modulo 16</option>
								<option value="17">Modulo 17</option>
								<option value="18">Modulo 18</option>
								<option value="19">Modulo 19</option>
								<option value="20">Modulo 20</option>
								<option value="21">Modulo 21</option>
								<option value="22">Modulo 22</option>
								<option value="FL">Modulo FL</option>
							</select>
						</div>

						<div className="pt-3">
							<LocalidadInput localtie={localtie} handleInputChange={handleInputChange} />
						</div>

						<div className=" row d-flex p-3">
							<label htmlFor="">
								<span className="text-warning">* </span>
								Lote destino:
							</label>
							<input
								type="text"
								className="form-control ml-1"
								placeholder="Lote"
								name="loteDestino"
								autoComplete="off"
								value={loteDestino}
								onChange={handleInputChange}
								onKeyUp={handleKeyUp}
							/>
						</div>

						<div className=" row d-flex p-3">
							<button
								className=" btn btn-outline-primary flex-fill"
								type="button"
								onClick={startSaveTransfer}
							>
								<span>Guardar </span>
								<i className="fas fa-save"></i>
							</button>
						</div>
					</div>
				</div>
			</>
		);
	} else return <></>;
};
