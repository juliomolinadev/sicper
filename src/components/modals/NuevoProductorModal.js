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

	const { openNuevoProductorModal } = useSelector((state) => state.altaPermisos);
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
			isOpen={openNuevoProductorModal}
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
// Ctrl + Shift + W R   : Emmet wrap.
// Alt + ↑ / ↓          : Mueve el contenido de una linea o seleccion.
// Shift + Tab          : Quita la indentacion de un bloque seleccionado.
// Alt + Shift + ↑ / ↓  : Clona la linea actual o bloque seleccionado abajo o arriba.
// Ctrl + Shift + L     : Selecciona todas las ocurrencias de la seleccion.
// Ctrl + Shift + K     : Borra la linea actual.
// Ctrl + Shift + ↑ / ↓ : Crea multicursores continuos.
// Ctrl + Alt + U       : Combierte seleccion en mayusculas.
// Ctrl + D             : Selecciona la siguiente ocurencia con multicursor.

// Ctrl + P             : [Input] Lista de busqueda para los archivos del proyecto
// Ctrl + Shift + P     : [Input + >] Lista de busqueda para comandos.
// Ctrl + Shift + O     : [Input + @] Lista de busqueda para las definiciones de elementos (: ordena).
// Ctrl + G             : [Input + :] Buscar una linea en especifico.

// Ctrl + Alt + clk der : Abre tab con la definicion del elemento en cursor, lo crea si no existe.
// Ctrl + Shift + F12   : Abre una ventana que muestra la definicion del elemento en cursor.
// F2                   : Refactorizar, rename.

// Ctrl + K Z           : Modo zen.
// Ctrl + `             : Abre la terminal.
// Ctrl + K Ctrl + S    : Configuracion de shortcuts.
// Ctrl + Shift + V     : Abre archivo en markdown para previsualizar.
// Shift + Alt + S      : Guarda todos los archivos.
// Ctrl + space         : Recupera el autocompletado.

// Ctrl + /             : Comenta la linea donde se encuentre el cursor o el bloque seleccionado.
// Ctrl + Shift + A     : Comenta solo el fragmento seleccionado.
