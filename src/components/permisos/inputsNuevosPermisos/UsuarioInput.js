import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
	closeUsuariosModal,
	openUsuariosModal,
	startLoadUsuarios,
	unsetUsuarioSelected
} from "../../../actions/usuarios";
import { useFormToUpper } from "../../../hooks/UseFormToUpper";

export const UsuarioInput = () => {
	const { modulo, variablesGlobales, privilegios } = useSelector((state) => state.auth);
	const { accesoGlobal } = privilegios;
	const { cicloActual: ciclo } = variablesGlobales;

	const { idUsuarioSelected, usuario: nombreUsuario } = useSelector((state) => state.altaPermisos);

	const dispatch = useDispatch();

	const handleOpenUsuariosModal = () => {
		handleLoadUsuarios();
		if (usuario.length > 0) {
			dispatch(openUsuariosModal());
		} else {
			Swal.fire("Nada para buscar", "Ingrese apellido paterno o cuenta del usuario", "warning");
		}
	};

	useEffect(() => {
		dispatch(unsetUsuarioSelected());
		dispatch(closeUsuariosModal());
	}, [dispatch]);

	const [global, setGlobal] = useState(false);
	const handleSetGlogal = () => {
		setGlobal(!global);
	};

	const handleLoadUsuarios = () => {
		dispatch(startLoadUsuarios(usuario.toUpperCase(), modulo, ciclo, global));
	};

	let usuarioLabel = "";

	if (idUsuarioSelected) {
		usuarioLabel = nombreUsuario;
	}

	const clearUsuarioInput = () => {
		dispatch(unsetUsuarioSelected());
		formValues.usuario = "";
	};

	const [formValues, handleInputChange] = useFormToUpper({
		usuario: ""
	});

	const { usuario } = formValues;

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			handleOpenUsuariosModal();
		}
	};

	return (
		<div className="col-sm-6">
			<div className="form-group d-flex align-items-baseline row p-3">
				<label className="col-sm-3">
					<span className="text-warning">* </span>
					Usuario:{" "}
				</label>
				<label>{usuarioLabel} </label>
				{accesoGlobal &&
					(global ? (
						<button onClick={handleSetGlogal} className="btn btn-primary mr-3">
							Global
						</button>
					) : (
						<button onClick={handleSetGlogal} className="btn btn-outline-primary mr-3">
							Global
						</button>
					))}
				{idUsuarioSelected ? <div className="fas fa-check text-success p-3"></div> : <></>}
				{idUsuarioSelected ? (
					<></>
				) : (
					<div className="flex-grow-1">
						<input
							tabIndex="1"
							type="text"
							className="form-control"
							placeholder="Apellido paterno o numero de cuenta"
							name="usuario"
							autoComplete="off"
							value={usuario}
							onChange={handleInputChange}
							onKeyUp={handleKeyUp}
							autoFocus
						/>
					</div>
				)}
				{idUsuarioSelected ? (
					<button
						tabIndex="-1"
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={clearUsuarioInput}
					>
						<i className="fas fa-trash"></i>
					</button>
				) : (
					<button
						tabIndex="-1"
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
