import React from "react";
import { useSelector } from "react-redux";
import { AssignTechnicianButton } from "../components/buttons/AssignTechnicianButton";
import { SelectableLocaltiesTable } from "../components/tables/SelectableLocaltiesTable";

export const AsignacionScreen = () => {
	const { selectedLocalties } = useSelector((state) => state.entidades);
	return (
		<>
			<div className="row d-flex justify-content-center p-4">
				<h1>Asignacion de técnico</h1>
			</div>
			{selectedLocalties && selectedLocalties.length > 0 ? <AssignTechnicianButton /> : <></>}
			<div className="row pt-3">
				<SelectableLocaltiesTable />
			</div>
		</>
	);
};
