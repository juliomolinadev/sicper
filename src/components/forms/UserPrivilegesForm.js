import React from "react";
import { useSelector } from "react-redux";
import { saveRolePrivileges } from "../../helpers/saveRolePrivileges";
import { useForm } from "../../hooks/useForm";

export const UserPrivilegesForm = () => {
	const { userRoleSelected, privilegesToEdit } = useSelector((state) => state.entidades);

	const privileges = {
		editarTodo: false,
		borrarPermisos: false
	};

	Object.getOwnPropertyNames(privilegesToEdit).map((privilegeName) => {
		privileges[privilegeName] = privilegesToEdit[privilegeName];
		return true;
	});

	const [formValues, handleInputChange] = useForm(privileges);

	const startSaveRolePrivileges = (e) => {
		e.preventDefault();

		saveRolePrivileges(userRoleSelected, formValues);
	};

	return (
		<form onSubmit={startSaveRolePrivileges} className="border rounded p-4">
			<div className="d-flex flex-wrap">
				<div className="w-75">PRIVILEGIOS</div>
				<button type="submit" className="w-25 btn btn-outline-primary">
					Guardar
				</button>
			</div>
			<div className="form-check d-flex flex-wrap">
				{Object.getOwnPropertyNames(privileges).map((privilege) => {
					return (
						<div key={privilege} className="w-25 p-1">
							<input
								className="form-check-input"
								type="checkbox"
								name={privilege}
								id={privilege}
								onChange={handleInputChange}
								checked={formValues[privilege]}
							/>
							<label className="form-check-label" htmlFor="todos">
								{privilege}
							</label>
						</div>
					);
				})}
			</div>
		</form>
	);
};
