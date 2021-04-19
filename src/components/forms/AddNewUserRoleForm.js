import React from "react";
import { saveNewUserRole } from "../../helpers/saveNewUserRole";
import { useForm } from "../../hooks/useForm";

export const AddNewUserRoleForm = () => {
	const [formValues, handleInputChange] = useForm({
		newRole: ""
	});

	const { newRole } = formValues;

	const handleSaveNewUserRole = () => {
		if (newRole.length > 0) {
			saveNewUserRole(newRole);
		}
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			handleSaveNewUserRole();
		}
	};

	return (
		<div className="row p-4">
			<div className="col-sm-1">
				<label>Rol:</label>
			</div>

			<div className="col-sm-8">
				<input
					type="text"
					className="form-control ml-1"
					placeholder="Nuevo Rol"
					name="newRole"
					autoComplete="off"
					value={newRole}
					onChange={handleInputChange}
					onKeyUp={handleKeyUp}
				/>
			</div>

			<div className="col-sm-3">
				<button
					className=" btn btn-outline-primary flex-fill"
					type="button"
					onClick={handleSaveNewUserRole}
				>
					<span>Agregar </span>
					<i className="fas fa-plus"></i>
				</button>
			</div>
		</div>
	);
};
