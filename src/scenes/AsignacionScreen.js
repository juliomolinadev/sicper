import React from "react";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import { PermisoAsignacion } from "../components/asignacion/PermisoAsignacion";
import { TechnicianDetail } from "../components/asignacion/TechnicianDetail";
import { LaboresPermitsTable } from "../components/tables/LaboresPermitsTable";
import { TechnicianTable } from "../components/tables/TechnicianTable";
import { asignacionReducer } from "../reducers/asignacionReducer";

export const AsignacionScreen = () => {
	const initialState = {
		technicians: [],
		technicianSelected: null,
		permits: [],
		permitSelected: null
	};

	const { privilegios } = useSelector((state) => state.auth);
	const { asignarTecnico } = privilegios;

	const { permisoSelected } = useSelector((state) => state.algodoneroScreen);

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

			{asignarTecnico && (
				<>
					<div className="row d-flex justify-content-center mt-5">
						<h4>Asignación individual</h4>
					</div>

					<div className="row">
						<div className="col-sm-8">
							<LaboresPermitsTable dispatch={dispatch} />
						</div>
						<div className="col-sm-4">{permisoSelected && <PermisoAsignacion state={state} />}</div>
					</div>
				</>
			)}

			<div className="mt-5">
				{" "}
				<br />
			</div>
		</>
	);
};
