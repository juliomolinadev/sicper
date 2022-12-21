import React from "react";
import { useSelector } from "react-redux";
import { privileges } from "../../helpers/consts";
import { saveRolePrivileges } from "../../helpers/saveRolePrivileges";
import { useForm } from "../../hooks/useForm";

export const UserPrivilegesForm = () => {
	const { userRoleSelected, privilegesToEdit } = useSelector((state) => state.entidades);
	const { uid } = useSelector((state) => state.auth);

	Object.getOwnPropertyNames(privilegesToEdit).map((privilegeName) => {
		privileges[privilegeName] = privilegesToEdit[privilegeName];
		return true;
	});

	const [formValues, handleInputChange] = useForm(privileges);

	const startSaveRolePrivileges = (e) => {
		e.preventDefault();

		saveRolePrivileges(userRoleSelected, formValues, uid);
	};

	return (
		<form onSubmit={startSaveRolePrivileges} className="border rounded p-4">
			<div className="row d-flex">
				<div className="col-sm-8">
					PRIVILEGIOS PARA EL ROL:{"  "}
					<span className="text-success font-weight-bold">{userRoleSelected}</span>
				</div>
				<div className="col-sm-4">
					<button type="submit" className=" btn btn-outline-primary">
						Guardar
					</button>
				</div>
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
