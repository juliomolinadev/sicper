import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignTechnician } from "../../helpers/assignTechnician";
import { unsetLocalties, unsetSelectedLocalties } from "../../actions/entidades/localidades";

export const AssignTechnicianButton = () => {
	const { selectedLocalties } = useSelector((state) => state.entidades);
	const { uid, modulo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const localtiesNames = [];

	const ciclo = "2020-2021";

	const startAssignTechnician = () => {
		selectedLocalties.forEach((location) => {
			localtiesNames.push(location.nombre);
		});
		assignTechnician(ciclo, modulo, localtiesNames, uid);
		dispatch(unsetSelectedLocalties());
		dispatch(unsetLocalties());
	};
	return (
		<div className="d-flex justify-content-center">
			<button className="btn btn-outline-primary" type="button" onClick={startAssignTechnician}>
				<span>Asignar técnico </span>
				<i className="fas fa-plus"></i>
			</button>
		</div>
	);
};
