import { loadPadronesDeCultivos } from "../helpers/DB/loadPadronesDeCultivos";
import { saveConcesionCultivo } from "../helpers/DB/saveConcesionCultivo";
import { types } from "../types/types";

export const startSetPadronesCultivos = () => {
	return async (dispatch, getState) => {
		const state = getState();
		const padrones = await loadPadronesDeCultivos(state.auth.variablesGlobales.cicloActual);

		dispatch(setPadronesCultivos(padrones));
	};
};

export const setPadronesCultivos = (padrones) => ({
	type: types.setPadronesCultivos,
	payload: padrones
});

export const setConcesionSelected = (concesion) => ({
	type: types.setConcesionSelected,
	payload: concesion
});

export const startSaveConcesion = (concesion) => {
	return async (dispatch, getState) => {
		const state = getState();
		const isSave = saveConcesionCultivo(concesion);

		if (isSave) {
			const newConcesiones = state.padronScreen.padrones.concesiones.map((concesionState) => {
				if (concesionState.id === concesion.id) return concesion;
				else return concesionState;
			});

			dispatch(
				setPadronesCultivos({
					...state.padronScreen.padrones,
					concesiones: newConcesiones
				})
			);
		}
	};
};

export const setCultivosConPadron = (cultivos) => ({
	type: types.setCultivosConPadron,
	payload: cultivos
});
