import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../actions/ui";
import { saveTransfer } from "../../helpers/saveTransfer";
import { startSetUsuarioSelected } from "../../actions/usuarios";

export const TransferForm = () => {
	const { usuario } = useSelector((state) => state.entidades);
	const [
		{ superficieTransferida, loteDestino, localidadDestino, moduloDestino },
		handleInputChange
	] = useForm({
		superficieTransferida: 0,
		loteDestino: "",
		localidadDestino: "",
		moduloDestino: ""
	});
	const { msgError } = useSelector((state) => state.ui);

	let superficieDisponible;

	if (usuario) {
		superficieDisponible = usuario.supRiego - usuario.supPrevia;
	}

	const dispatch = useDispatch();

	const isFormValid = () => {
		if (superficieTransferida === 0) {
			dispatch(setError("Indique superficie a transferir"));
			return false;
		} else if (superficieTransferida > superficieDisponible) {
			dispatch(setError("La superficie a transferir excede a la superficie disponible"));
			return false;
		} else if (moduloDestino.trim().length === 0) {
			// TODO: Verificar que exista el modulo
			dispatch(setError("Indique el módulo destino"));
			return false;
		} else if (loteDestino.trim().length === 0) {
			dispatch(setError("Indique el lote en el que se aplicará la transferencia"));
			return false;
		} else if (localidadDestino.trim().length === 0) {
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
				localidadDestino,
				moduloDestino,
				cuentaOrigen: `${usuario.cuenta}.${usuario.subcta}`,
				usuario: `${usuario.apPaterno} ${usuario.apMaterno} ${usuario.nombre}`,
				loteOrigen: usuario.predio,
				localidadOrigen: usuario.ejido,
				moduloOrigen: usuario.modulo,
				fecha: new Date()
			};
			saveTransfer(transfer, ciclo);
			dispatch(startSetUsuarioSelected(usuario));
		}
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			startSaveTransfer();
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
						{msgError && <div className="auth__alert-error">{msgError}</div>}
						<div className=" row d-flex p-3">
							<label htmlFor="">Superficie a transferir (ha):</label>
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

						<div className=" row d-flex p-3">
							<label htmlFor="">Modulo destino:</label>
							<input
								type="text"
								className="form-control ml-1"
								placeholder="Modulo"
								name="moduloDestino"
								autoComplete="off"
								value={moduloDestino}
								onChange={handleInputChange}
								onKeyUp={handleKeyUp}
							/>
						</div>

						<div className=" row d-flex p-3">
							<label htmlFor="">Lote destino:</label>
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
							{/* TODO: Implementar lista de localidades */}
							<label htmlFor="">Localidad destino:</label>
							<input
								type="text"
								className="form-control ml-1"
								placeholder="Localidad"
								name="localidadDestino"
								autoComplete="off"
								value={localidadDestino}
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
