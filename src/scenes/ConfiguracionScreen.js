import React from "react";
import { UserRoleModal } from "../components/modals/UserRoleModal";
import { UsersRoleManagement } from "../components/modulos/UsersRoleManagement";
import { useSelector } from "react-redux";

export const ConfiguracionScreen = () => {
	const { privilegios } = useSelector((state) => state.auth);

	return (
		<>
			<div className="row pt-4">
				<div className="col-sm-12 d-flex justify-content-center">
					<h1>Configuracion</h1>
				</div>
			</div>

			<div className="row pt-4">
				<div className="col-sm-12">
					{privilegios.asignarRoles ? <UsersRoleManagement /> : <></>}
				</div>
			</div>

			<UserRoleModal />
		</>
	);
};
