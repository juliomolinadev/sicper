import React from "react";
import { UserRoleModal } from "../components/modals/UserRoleModal";
import { UsersRoleManagement } from "../components/modulos/UsersRoleManagement";
import { useDispatch, useSelector } from "react-redux";
import { actualizarEntidades } from "../helpers/DB/actualizarEntidades";
import { EntityEditingModule } from "../components/modulos/EntityEditingModule";
import { startLoadEntities } from "../actions/entidades/entities";

export const ConfiguracionScreen = () => {
	const { privilegios } = useSelector((state) => state.auth);

	const handleActualizarEntidades = () => {
		actualizarEntidades();
	};

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

			{privilegios.actualizarEntidades && (
				<div className="mb-3 d-flex justify-content-center mt-4">
					<button
						type="button"
						className="btn btn-outline-primary"
						onClick={handleActualizarEntidades}
					>
						<span> Actualizar Entidades</span>
					</button>
				</div>
			)}

			<UserRoleModal />
		</>
	);
};
