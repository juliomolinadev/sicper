import React from "react";
import { UserRoleModal } from "../components/modals/UserRoleModal";
import { UsersRoleManagement } from "../components/modulos/UsersRoleManagement";
import { useDispatch, useSelector } from "react-redux";
import { EntityEditingModule } from "../components/modulos/EntityEditingModule";
import { startLoadEntities } from "../actions/entidades/entities";
import { useForm } from "../hooks/useForm";
import { RadioButtonGroup } from "../components/ui/molecules/RadioButtonGroup";

export const ConfiguracionScreen = () => {
	const { privilegios } = useSelector((state) => state.auth);
	const { entities } = useSelector((state) => state.entidades);

	const dispatch = useDispatch();

	if (!entities) {
		dispatch(startLoadEntities());
	}

	const [modules, modulesChange] = useForm();
	console.log(modules);

	const modulesNames = [
		{
			id: "usuarios",
			label: "usuarios"
		},
		{
			id: "entidades",
			label: "entidades"
		}
	];

	const checkboxStyles = {
		group: "btn-group btn-group-toggle d-print-none",
		button: "btn btn-outline-primary"
	};

	return (
		<>
			<div className="row pt-4">
				<div className="col-sm-12 d-flex justify-content-center">
					<h1>Configuracion</h1>
				</div>
			</div>

			<div className="row justify-content-center pt-4">
				<RadioButtonGroup
					inputName={"module"}
					options={modulesNames}
					formValues={modules}
					setFunction={modulesChange}
					styles={checkboxStyles}
				/>
			</div>

			<div className="row mt-4">
				<div className="col-sm-12">
					{modules.module === "usuarios" && privilegios.asignarRoles && <UsersRoleManagement />}
				</div>
			</div>

			<div className="row mt-4">
				<div className="col-sm-12">
					{modules.module === "entidades" && privilegios.editarEntidades && <EntityEditingModule />}
				</div>
			</div>

			<UserRoleModal />
		</>
	);
};
