import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startAssignTechnician } from "../../actions/entidades/localidades";

export const AssignTechnicianButton = () => {
	const { selectedLocalties } = useSelector((state) => state.entidades);
	const { uid, modulo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const localtiesNames = [];

	const ciclo = "2020-2021";

	if (selectedLocalties) {
		selectedLocalties.forEach((location) => {
			localtiesNames.push(location.nombre);
		});
	}

	const handleAssingTechnician = () => {
		dispatch(startAssignTechnician(ciclo, modulo, localtiesNames, uid));
	};

	return (
		<div className="d-flex justify-content-center">
			<button className="btn btn-outline-primary" type="button" onClick={handleAssingTechnician}>
				<span>Asignar técnico </span>
				<i className="fas fa-plus"></i>
			</button>
		</div>
	);
};
