import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../hooks/useForm";
import {
	openUsuariosModal,
	startLoadUsuarios,
	unsetUsuarioSelected
} from "../../../actions/usuarios";

export const UsuarioInput = () => {
	const dispatch = useDispatch();

	const handleOpenUsuariosModal = () => {
		handleLoadUsuarios();
		dispatch(openUsuariosModal());
	};

	const handleLoadUsuarios = () => {
		dispatch(startLoadUsuarios(usuario.toUpperCase(), claveEntidad));
	};

	const { claveEntidad } = useSelector((state) => state.auth);

	const { cuentaSelected, subCuentaSelected } = useSelector((state) => state.altaPermisos);

	let cuenta = "";

	if (cuentaSelected) {
		cuenta = `${cuentaSelected}-${subCuentaSelected}`;
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
				<label>{cuenta} </label>
				{cuentaSelected ? <div className="fas fa-check text-success p-3"></div> : <></>}
				{cuentaSelected ? (
					<></>
				) : (
					<div className="flex-grow-1">
						<input
							type="text"
							className="form-control"
							placeholder="Usuario"
							name="usuario"
							autoComplete="off"
							value={usuario}
							onChange={handleInputChange}
						/>
					</div>
				)}
				{cuentaSelected ? (
					<button
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={clearUsuarioInput}
					>
						<i className="fas fa-redo"></i>
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
