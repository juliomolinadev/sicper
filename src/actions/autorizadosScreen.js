import { loadAutorizados } from "../helpers/loadAutorizados";
import { types } from "../types/types";

export const setModulo = (modulo) => ({
	type: types.autorizadosScreenSetModulo,
	payload: modulo
});

export const unsetModulo = () => ({
	type: types.autorizadosScreenUnsetModulo
});

export const startLoadAutorizados = (ciclo, modulo) => {
	return async (dispatch) => {
		const autorizados = await loadAutorizados(ciclo, modulo);

		let superficieReferencia = 0;
		autorizados.forEach((autorizado) => {
			superficieReferencia += autorizado.gravedadNormalAutorizada;
			superficieReferencia += autorizado.gravedadNormalAsignada;
			superficieReferencia += autorizado.gravedadExtraAutorizada;
			superficieReferencia += autorizado.gravedadExtraAsignada;
			superficieReferencia += autorizado.pozoNormalAutorizada;
			superficieReferencia += autorizado.pozoNormalAsignada;
			superficieReferencia += autorizado.pozoExtraAutorizada;
			superficieReferencia += autorizado.pozoExtraAsignada;
		});
		dispatch(setAutorizados(autorizados));
		dispatch(setSuperficieReferencia(superficieReferencia));
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

export const setSuperficieReferencia = (superficieReferencia) => ({
	type: types.setSuperficieReferencia,
	payload: superficieReferencia
});

export const unsetSuperficieReferencia = () => ({
	type: types.unsetSuperficieReferencia
});

export const setFormError = (formError) => ({
	type: types.setFormError,
	payload: formError
});

export const removeFormError = () => ({
	type: types.removeFormError
});
