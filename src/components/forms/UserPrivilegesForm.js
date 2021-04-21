import React from "react";
import { useSelector } from "react-redux";
import { saveRolePrivileges } from "../../helpers/saveRolePrivileges";
import { useForm } from "../../hooks/useForm";

export const UserPrivilegesForm = () => {
	const { userRoleSelected, privilegesToEdit } = useSelector((state) => state.entidades);

	const privileges = {
		pantallaInicio: false,
		pantallaPadron: false,
		pantallaPermisos: false,
		pantallaTransferencias: false,
		pantallaAsignacion: false,
		pantallaLabores: false,
		pantallaAutorizados: false,
		pantallaReportes: false,
		pantallaConfiguracion: false,
		consultarExpedicion: false,
		consultarAutorizados: false,
		expedirPermisos: false,
		consultarPermisos: false,
		cancelarPermisos: false,
		solicitarTransferencias: false,
		asignarTécnico: false,
		consultarLabores: false,
		registrarLabores: false,
		pagarLabores: false,
		imprimirLabores: false,
		reportesPermisos: false,
		reportesExpedición: false,
		reportesAutorizados: false,
		asignarRoles: false,
		editarRoles: false
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
