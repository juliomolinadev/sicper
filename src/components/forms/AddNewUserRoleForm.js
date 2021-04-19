import React from "react";
import { useDispatch } from "react-redux";
import { startSetUserRoles } from "../../actions/entidades/sistemUsers";
import { saveNewUserRole } from "../../helpers/saveNewUserRole";
import { useForm } from "../../hooks/useForm";

export const AddNewUserRoleForm = () => {
	const [formValues, handleInputChange] = useForm({
		newRole: ""
	});

	const { newRole } = formValues;

	const dispatch = useDispatch();

	const handleSaveNewUserRole = () => {
		if (newRole.length > 0) {
			saveNewUserRole(newRole);
			dispatch(startSetUserRoles());
		}
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			handleSaveNewUserRole();
		}
	};

	return (
		<div className="row">
			<div className="col-sm-3">
				<label>Crear nuevo rol:</label>
			</div>

			<div className="col-sm-5">
				<input
					type="text"
					className="form-control"
					placeholder="Nuevo Rol"
					name="newRole"
					autoComplete="off"
					value={newRole}
					onChange={handleInputChange}
					onKeyUp={handleKeyUp}
				/>
			</div>

			<div className="col-sm-4">
				<button className="btn btn-outline-primary" type="button" onClick={handleSaveNewUserRole}>
					<span>Agregar </span>
					<i className="fas fa-plus"></i>
				</button>
			</div>
		</div>
	);
};
