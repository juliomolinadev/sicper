import { loadAutorizados } from "../helpers/loadAutorizados";
import { types } from "../types/types";

export const setModulo = (modulo) => ({
	type: types.autorizadosScreenSetModulo,
	payload: modulo
});

export const unsetModulo = () => ({
	type: types.autorizadosScreenUnsetModulo
});

export const startLoadAutorizados = (modulo) => {
	return async (dispatch) => {
		const autorizados = await loadAutorizados(modulo);
		dispatch(setAutorizados(autorizados));
	};
};

export const updateAutorizados = (autorizados, autorizadoSelected) => {
	autorizados.forEach((autorizado) => {
		if (autorizado.cultivo === autorizadoSelected.cultivo) {
			autorizado = autorizadoSelected;
		}
	});
	return async (dispatch) => {
		await dispatch(setAutorizadoSelected(autorizadoSelected));
		dispatch(setAutorizados(autorizados));
	};
};

export const setAutorizados = (autorizados) => ({
	type: types.autorizadosScreenSetAutorizados,
	payload: autorizados
});

export const unsetAutorizados = () => ({
	type: types.autorizadosScreenUnsetAutorizados
});

export const openAutorizadosModal = () => ({
	type: types.openAutorizadosModal
});

export const closeAutorizadosModal = () => ({
	type: types.closeAutorizadosModal
});

export const setAutorizadoSelected = (autorizado) => ({
	type: types.setAutorizadoSelected,
	payload: autorizado
});

export const unsetAutorizadoSelected = () => ({
	type: types.unsetAutorizadoSelected
});
