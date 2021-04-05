import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";

import { removeError, setError } from "../../actions/ui";
import { updateSystemUser } from "../../helpers/updateSystemUser";
import { startLoadSystemUsers, unsetSystemUserSelected } from "../../actions/entidades/sistemUsers";

export const SystemUserCard = () => {
	const { systemUserSelected: user } = useSelector((state) => state.entidades);
	const { msgError } = useSelector((state) => state.ui);
	const { claveEntidad } = useSelector((state) => state.auth);

	const [formValues, handleInputChange] = useForm();
	const { rol } = formValues;

	const dispatch = useDispatch();

	const handleSetUserRole = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			updateSystemUser(user.id, rol);
			dispatch(startLoadSystemUsers(claveEntidad));
			dispatch(unsetSystemUserSelected());
		}
	};

	const isFormValid = () => {
		if (!rol) {
			dispatch(setError("Seleccione un rol de usuario"));
			return false;
		}
		dispatch(removeError());

		return true;
	};

	if (user) {
		return (
			<div className="row border border-info rounded m-1">
				<div className="col-12">
					<div className="row border-bottom border-info p-2">
						<div className="col-12 d-flex justify-content-center">
							<h5>Cuenta: {user.email}</h5>
						</div>
					</div>
					<div className="row">
						<div className="col-12 d-flex flex-column p-4">
							<div>Usuario: {user.displayName}</div>
							<div>Clave Entidad: {user.claveEntidad}</div>
							{user.rol === "sinAsignar" ? (
								<div className="text-warning">Rol: {user.rol}</div>
							) : (
								<div className="text-success">Rol: {user.rol}</div>
							)}
							<form onSubmit={handleSetUserRole} className="form-group pt-3">
								<select
									type="text"
									name="rol"
									value={rol}
									onChange={handleInputChange}
									className="form-control"
								>
									<option hidden defaultValue={false}>
										Rol
									</option>
									<option value="sinAsignar">Sin Asignar</option>
									<option value="operadorModulo">Modulo (Operador)</option>
									<option value="operadorCNA">CNA (Operador)</option>
								</select>
								<button type="submit" className="btn btn-outline-primary btn-block mt-3 mb-5">
									Asignar Rol
								</button>

								{msgError && <div className="auth__alert-error">{msgError}</div>}
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	} else return <></>;
};
