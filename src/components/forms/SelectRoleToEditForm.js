import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSetUserRoles, startSetPrivilegesToEdit } from "../../actions/entidades/sistemUsers";
import { useForm } from "../../hooks/useForm";

export const SelectRoleToEditForm = () => {
	const { userRoles } = useSelector((state) => state.entidades);
	const dispatch = useDispatch();

	const [formValues, handleInputChange] = useForm();
	const { selectedRole } = formValues;

	if (!userRoles) {
		dispatch(startSetUserRoles());
	}

	if (userRoles) {
		const handleSelectRoleToEdit = (e) => {
			e.preventDefault();

			if (selectedRole) {
				dispatch(startSetPrivilegesToEdit(selectedRole));
			}
		};

		return (
			<form onSubmit={handleSelectRoleToEdit} className="form-group pt-3">
				<select
					type="text"
					name="selectedRole"
					value={selectedRole}
					onChange={handleInputChange}
					className="form-control"
				>
					<option hidden defaultValue={false}>
						Rol
					</option>
					{userRoles.map((role) => {
						return (
							<option key={role} value={role}>
								{role}
							</option>
						);
					})}
				</select>

				<button type="submit" className="btn btn-outline-primary btn-block mt-3 mb-5">
					Editar Rol
				</button>
			</form>
		);
	} else return <></>;
};
