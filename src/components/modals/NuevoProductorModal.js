import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeNuevoProductorModal } from "../../actions/nuevoProductor";
import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../actions/ui";
import { startSaveProductor } from "../../actions/nuevoProductor";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		height: "550px"
	}
};

Modal.setAppElement("#root");

export const NuevoProductorModal = () => {
	const dispatch = useDispatch();

	const { isOpenNuevoProductorModal } = useSelector((state) => state.altaPermisos);
	const { msgError } = useSelector((state) => state.ui);

	const closeModal = () => {
		dispatch(closeNuevoProductorModal());
	};

	const [formValues, handleInputChange] = useForm();

	const {
		apPaterno = "",
		direccion = "",
		apMaterno = "",
		estado = "",
		nombre = "",
		municipio = "",
		rfc = "",
		cp = "",
		genero = "",
		telefono = ""
	} = formValues;

	const handleRegister = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			dispatch(
				startSaveProductor({
					...formValues,
					apPaterno: apPaterno.toUpperCase(),
					apMaterno: apMaterno.toUpperCase(),
					nombre: nombre.toUpperCase(),
					direccion: direccion.toUpperCase(),
					estado: estado.toUpperCase(),
					municipio: municipio.toUpperCase(),
					rfc: rfc.toUpperCase(),
					telefono: telefono.replace(/ /g, "")
				})
			);
			closeModal();
			// TODO: Seleccionar el nuebo productor recien guardado
			// TODO: Enviar mensaje de confirmacion para nuevo productor
		}
	};

	const isFormValid = () => {
		if (apPaterno.trim().length === 0) {
			dispatch(setError("Se requiere apellido paterno"));
			return false;
		} else if (direccion.trim().length === 0) {
			dispatch(setError("Se requiere direccion"));
			return false;
		} else if (apMaterno.trim().length === 0) {
			dispatch(setError("Se requiere apellido materno"));
			return false;
		} else if (estado.trim().length === 0) {
			dispatch(setError("Se requiere estado"));
			return false;
		} else if (nombre.trim().length === 0) {
			dispatch(setError("Se requiere nombre"));
			return false;
		} else if (municipio.trim().length === 0) {
			dispatch(setError("Se requiere municipio"));
			return false;
		} else if (rfc.trim().length < 12) {
			dispatch(setError("RFC no valido"));
			return false;
		} else if (cp.trim().length < 5) {
			dispatch(setError("Codigo postal no valido"));
			return false;
		} else if (!genero) {
			dispatch(setError("Se requiere genero"));
			return false;
		} else if (telefono.replace(/ /g, "").length < 10) {
			dispatch(setError("Telefono no valido"));
			return false;
		}
		dispatch(removeError());

		return true;
	};

	return (
		<Modal
			isOpen={isOpenNuevoProductorModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<div className="row m-3 d-flex justify-content-center">
				<h1>Registro de nuevo productor</h1>
			</div>

			<form className="container pb-4" autoComplete="waa" onSubmit={handleRegister}>
				{msgError && <div className="auth__alert-error">{msgError}</div>}
				<div className="row p-2">
					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="Apellido Paterno"
							name="apPaterno"
							autoComplete="off"
							onChange={handleInputChange}
						/>
					</div>

					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="Direccion"
							name="direccion"
							autoComplete="waa"
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="row p-2">
					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="Apellido Materno"
							name="apMaterno"
							autoComplete="waa"
							onChange={handleInputChange}
						/>
					</div>

					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="Estado"
							name="estado"
							autoComplete="waa"
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="row p-2">
					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="Nombre"
							name="nombre"
							autoComplete="off"
							onChange={handleInputChange}
						/>
					</div>

					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="Municipio"
							name="municipio"
							autoComplete="waa"
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="row p-2">
					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="RFC"
							name="rfc"
							autoComplete="waa"
							onChange={handleInputChange}
						/>
					</div>

					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="CP"
							name="cp"
							autoComplete="waa"
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="row p-2">
					<div className="col-sm-6 d-flex align-items-baseline pt-2">
						<div className="px-4">
							<input
								type="radio"
								id="masculino"
								name="genero"
								value="MASCULINO"
								onChange={handleInputChange}
							/>
							<span> </span>
							<label htmlFor="masculino"> Masculino</label>
						</div>
						<div className="px-4">
							<input
								type="radio"
								id="femenino"
								name="genero"
								value="FEMENINO"
								onChange={handleInputChange}
							/>
							<span> </span>
							<label htmlFor="femenino"> Femenino</label>
						</div>
					</div>

					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="Telefono"
							name="telefono"
							autoComplete="off"
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="row d-flex justify-content-center pt-5">
					<button type="submit" className="btn btn-outline-primary">
						<i className="far fa-save"></i>
						<span> Guardar</span>
					</button>
				</div>
			</form>
		</Modal>
	);
};
