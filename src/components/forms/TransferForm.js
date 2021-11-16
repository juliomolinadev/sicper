import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeError, setError } from "../../actions/ui";
import { CultivoInput2 } from "../permisos/inputsNuevosPermisos/CultivoInput2";
import { LocalidadInput } from "../permisos/inputsNuevosPermisos/LocalidadInput";
import { getTranseferCount } from "../../helpers/DB/getTransferCount";
import { openTransferModal, setNuevaTransferencia } from "../../actions/transferenciasScreen";

export const TransferForm = ({ values, handleInputChange }) => {
	const { usuario, localtieSelected } = useSelector((state) => state.entidades);
	const { nombreCultivo, claveCultivo } = useSelector((state) => state.altaPermisos);
	const { msgError } = useSelector((state) => state.ui);

	const {
		superficieTransferida,
		loteDestino,
		moduloDestino,
		cultivo,
		localtie,
		apPaternoSolicitante,
		apMaternoSolicitante,
		nombreSolicitante
	} = values;

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
		} else if (nombreCultivo === null) {
			dispatch(setError("Indique Cultivo"));
			return false;
		} else if (apPaternoSolicitante.trim().length === 0) {
			dispatch(setError("Indique apellido paterno del solicitante"));
			return false;
		} else if (apMaternoSolicitante.trim().length === 0) {
			dispatch(setError("Indique apellido materno del solicitante"));
			return false;
		} else if (nombreSolicitante.trim().length === 0) {
			dispatch(setError("Indique nombre del solicitante"));
			return false;
		} else if (moduloDestino.trim().length === 0) {
			dispatch(setError("Indique el módulo destino"));
			return false;
		} else if (localtieSelected === null || localtieSelected === undefined) {
			dispatch(setError("Indique la localidad destino"));
			return false;
		} else if (loteDestino.trim().length === 0) {
			dispatch(setError("Indique el lote en el que se aplicará la transferencia"));
			return false;
		}
		dispatch(removeError());

		return true;
	};

	const auth = useSelector((state) => state.auth);
	const ciclo = auth.variablesGlobales.cicloActual;

	const fill = (number, len) => "0".repeat(len - number.toString().length) + number.toString();

	const defineFolio = async () => {
		const counter = await getTranseferCount(moduloDestino, ciclo);
		if (counter !== false) {
			const folio = `M${moduloDestino}-${fill(counter + 1, 3)}`;
			return folio;
		} else return null;
	};

	const startSaveTransfer = async (e) => {
		e.preventDefault();
		if (isFormValid()) {
			const transfer = {
				...usuario,
				folio: await defineFolio(),
				ciclo,
				estadoTransferencia: "PENDIENTE",
				superficieTransferida: parseInt(superficieTransferida),
				loteDestino,
				moduloDestino,
				apPaternoSolicitante,
				apMaternoSolicitante,
				nombreSolicitante,
				nombreCultivo,
				claveCultivo,
				localidadDestino: localtieSelected.nombre,
				clavelocalidadDestino: localtieSelected.clave,
				tipolocalidadDestino: localtieSelected.tipo,
				fecha: new Date()
			};

			if (transfer.folio !== null) {
				dispatch(setNuevaTransferencia(transfer));
				dispatch(openTransferModal());
			}
		}
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			startSaveTransfer(event);
		}
	};

	return (
		<>
			<div className="border border-info rounded mt-4">
				<div className="d-flex justify-content-center border-bottom border-info p-2">
					<h3>Transferencia</h3>
				</div>

				<div className="d-flex flex-column p-3">
					<div className="row d-flex p-3 text-warning">* Campos obligatorios</div>

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

					<div className="border rounded p-2">
						Datos del solicitante
						<div className=" row d-flex p-3">
							<label htmlFor="">
								<span className="text-warning">* </span>
								Apellido paterno:
							</label>
							<input
								type="text"
								className="form-control ml-1"
								placeholder="Apellido paterno"
								name="apPaternoSolicitante"
								autoComplete="off"
								value={apPaternoSolicitante}
								onChange={handleInputChange}
								onKeyUp={handleKeyUp}
							/>
						</div>
						<div className=" row d-flex p-3">
							<label htmlFor="">
								<span className="text-warning">* </span>
								Apellido materno:
							</label>
							<input
								type="text"
								className="form-control ml-1"
								placeholder="Apellido materno"
								name="apMaternoSolicitante"
								autoComplete="off"
								value={apMaternoSolicitante}
								onChange={handleInputChange}
								onKeyUp={handleKeyUp}
							/>
						</div>
						<div className=" row d-flex p-3">
							<label htmlFor="">
								<span className="text-warning">* </span>
								Nombre:
							</label>
							<input
								type="text"
								className="form-control ml-1"
								placeholder="Nombre"
								name="nombreSolicitante"
								autoComplete="off"
								value={nombreSolicitante}
								onChange={handleInputChange}
								onKeyUp={handleKeyUp}
							/>
						</div>
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
							<option value="9A">Modulo 9A</option>
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
							<option value="23">Modulo 23</option>
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

					{msgError && <div className="auth__alert-error">{msgError}</div>}

					<div className=" row d-flex p-3">
						<button
							className=" btn btn-outline-primary flex-fill"
							type="button"
							onClick={startSaveTransfer}
						>
							<span>Revisar </span>
							<i className="far fa-file"></i>
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
