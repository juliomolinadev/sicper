import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../hooks/useForm";
import Swal from "sweetalert2";
import {
	openUsuariosModal,
	startLoadUsuarios,
	unsetUsuarioSelected
} from "../../../actions/usuarios";

export const UsuarioInput = () => {
	const dispatch = useDispatch();

	const handleOpenUsuariosModal = () => {
		handleLoadUsuarios();
		if (usuario.length > 0) {
			dispatch(openUsuariosModal());
		} else {
			Swal.fire("Nada para buscar", "Ingrese apellido paterno del usuario", "warning");
		}
	};

	const handleLoadUsuarios = () => {
		dispatch(startLoadUsuarios(usuario.toUpperCase(), claveEntidad));
	};

	const { claveEntidad } = useSelector((state) => state.auth);

	const { idUsuarioSelected, usuario: nombreUsuario } = useSelector((state) => state.altaPermisos);

	let usuarioLabel = "";

	if (idUsuarioSelected) {
		usuarioLabel = nombreUsuario;
	}

	const clearUsuarioInput = () => {
		dispatch(unsetUsuarioSelected());
		formValues.usuario = "";
	};

	const [formValues, handleInputChange] = useForm({
		usuario: ""
	});

	const { usuario } = formValues;

	return (
		<div className="col-sm-6">
			<div className="form-group d-flex align-items-baseline row p-3">
				<label className="col-sm-3">Usuario: </label>
				<label>{usuarioLabel} </label>
				{idUsuarioSelected ? <div className="fas fa-check text-success p-3"></div> : <></>}
				{idUsuarioSelected ? (
					<></>
				) : (
					<div className="flex-grow-1">
						<input
							type="text"
							className="form-control"
							placeholder="Apellido paterno"
							name="usuario"
							autoComplete="off"
							value={usuario}
							onChange={handleInputChange}
						/>
					</div>
				)}
				{idUsuarioSelected ? (
					<button
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={clearUsuarioInput}
					>
						<i className="fas fa-trash"></i>
					</button>
				) : (
					<button
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={handleOpenUsuariosModal}
					>
						<i className="fas fa-search"></i>
					</button>
				)}
			</div>
		</div>
	);
};
