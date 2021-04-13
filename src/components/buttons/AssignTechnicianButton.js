import React from "react";
import { useSelector } from "react-redux";
import { assignTechnician } from "../../helpers/assignTechnician";

export const AssignTechnicianButton = () => {
	const { selectedLocalties } = useSelector((state) => state.entidades);
	const { uid, modulo } = useSelector((state) => state.auth);

	const localtiesNames = [];

	const ciclo = "2020-2021";

	const startAssignTechnician = () => {
		selectedLocalties.forEach((location) => {
			localtiesNames.push(location.nombre);
		});
		assignTechnician(ciclo, modulo, localtiesNames, uid);
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
