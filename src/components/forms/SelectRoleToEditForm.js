import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	startSetUserRoles,
	startSetPrivilegesToEdit,
	unsetUserRoles,
	unsetUserRoleSelected
} from "../../actions/entidades/sistemUsers";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { deleteUserRole } from "../../helpers/deleteUserRole";

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

		const startDeleteUserRole = () => {
			Swal.fire({
				title: "Atención!!",
				text: `Esta apunto de borrar el rol de usuario ${selectedRole}, ¿Realmente desea borrarlo?`,
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Si",
				cancelButtonText: "No"
			}).then((result) => {
				if (result.isConfirmed) {
					deleteUserRole(selectedRole);
					dispatch(unsetUserRoles());
					dispatch(unsetUserRoleSelected());
					dispatch(startSetUserRoles());
					Swal.fire(`Rol: ${selectedRole}`, "Se borro el rol con éxito !", "success");
				}
			});
		};

		return (
			<div className="row">
				<div className="col-sm-3">Gestionar rol:</div>

				<div className="col-sm-5">
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
				</div>

				<div className="col-sm-4 d-flex">
					{selectedRole ? (
						<button onClick={handleSelectRoleToEdit} className="btn btn-outline-primary">
							<span>Editar Rol </span>
							<i className="fas fa-edit"></i>
						</button>
					) : (
						<></>
					)}

					{selectedRole ? (
						<button onClick={startDeleteUserRole} className=" btn btn-outline-danger ml-4">
							<span>Borrar</span>
						</button>
					) : (
						<></>
					)}
				</div>
			</div>
		);
	} else return <></>;
};
