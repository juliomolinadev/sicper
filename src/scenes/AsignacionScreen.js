import React from "react";
import { useReducer } from "react";
import { TechnicianTable } from "../components/tables/TechnicianTable";
import { asignacionReducer } from "../reducers/asignacionReducer";

export const AsignacionScreen = () => {
	const initialState = {
		technicians: [],
		technicianSelected: null,
		permits: [],
		permitSelected: null
	};

	const [state, dispatch] = useReducer(asignacionReducer, initialState);
	console.log(state);

	return (
		<>
			<div className="row d-flex justify-content-center p-4">
				<h1>Asignación de técnico</h1>
			</div>
			{/* {selectedLocalties && selectedLocalties.length > 0 ? <AssignTechnicianButton /> : <></>}
			<div className="row pt-3">
				<SelectableLocaltiesTable />
			</div> */}

			<div className="row">
				<div className="col-sm-8">
					<TechnicianTable state={state} dispatch={dispatch} />
				</div>

				<div className="col-sm-4">Card</div>
			</div>
		</>
	);
};
