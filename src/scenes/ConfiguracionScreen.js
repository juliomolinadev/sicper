import React from "react";
import { UserRoleModal } from "../components/modals/UserRoleModal";
import { UsersRoleManagement } from "../components/modulos/UsersRoleManagement";
import { useDispatch, useSelector } from "react-redux";
import { EntityEditingModule } from "../components/modulos/EntityEditingModule";
import { startLoadEntities } from "../actions/entidades/entities";

export const ConfiguracionScreen = () => {
	const { privilegios } = useSelector((state) => state.auth);

	const { entities } = useSelector((state) => state.entidades);

	const dispatch = useDispatch();

	if (!entities) {
		dispatch(startLoadEntities());
	}

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

			<div className="row pt-4">
				<div className="col-sm-12">{entities && <EntityEditingModule />}</div>
			</div>

			<UserRoleModal />
		</>
	);
};
