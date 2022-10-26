import React, { useEffect } from "react";
import { useReducer } from "react";
import { useSelector } from "react-redux";
import { PermisoAsignacion } from "../components/asignacion/PermisoAsignacion";
import { SelectedLocaltiesDetail } from "../components/asignacion/SelectedLocaltiesDetail";
import { LaboresPermitsTable } from "../components/tables/LaboresPermitsTable";
import { SelectableLocaltiesTable } from "../components/tables/SelectableLocaltiesTable";
import { loadTechnician } from "../helpers/DB/loadTechnician";
import { loadLocaltiesFromPermits } from "../helpers/loadLocaltiesFromPermits";
import { asignacionReducer } from "../reducers/asignacionReducer";
import { types } from "../types/types";

export const AsignacionScreen = () => {
	const initialState = {
		localties: [],
		selectedLocalties: [],
		technicians: [],
		technicianSelected: null,
		permits: [],
		permitSelected: null
	};

	const { privilegios, variablesGlobales } = useSelector((state) => state.auth);
	const { asignarTecnico } = privilegios;
	const { permisoSelected } = useSelector((state) => state.algodoneroScreen);

	const [state, dispatch] = useReducer(asignacionReducer, initialState);
	const { selectedLocalties, localties } = state;
	// console.log(state);

	useEffect(() => {
		loadLocaltiesFromPermits(variablesGlobales.cicloActual).then((localties) => {
			dispatch({ type: types.setLocaltiesAsignacion, payload: localties });
		});
	}, [dispatch, variablesGlobales.cicloActual]);

	useEffect(() => {
		loadTechnician().then((techniciasns) => {
			dispatch({ type: types.setTechnicians, payload: techniciasns });
		});
	}, [dispatch]);

	return (
		<>
			<div className="row d-flex justify-content-center p-4">
				<h1>Asignación de técnico</h1>
			</div>

			<div className="row">
				<div className="col-sm-8">
					{localties.length > 0 && (
						<SelectableLocaltiesTable localties={localties} dispatch={dispatch} />
					)}
				</div>

				<div className="col-sm-4">
					{selectedLocalties.length > 0 && (
						<SelectedLocaltiesDetail state={state} dispatch={dispatch} />
					)}
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
