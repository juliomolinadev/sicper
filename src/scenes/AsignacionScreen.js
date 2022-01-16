import React from "react";
import { useReducer } from "react";
import { TechnicianDetail } from "../components/asignacion/TechnicianDetail";
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
	// console.log(state);

	const { technicianSelected: technician } = state;

	return (
		<>
			<div className="row d-flex justify-content-center p-4">
				<h1>Asignación de técnico</h1>
			</div>

			<div className="row">
				<div className="col-sm-8">
					<TechnicianTable state={state} dispatch={dispatch} />
				</div>

				<div className="col-sm-4">
					{technician && <TechnicianDetail state={state} dispatch={dispatch} />}
				</div>
			</div>
		</>
	);
};
