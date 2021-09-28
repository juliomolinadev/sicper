import { loadAutorizadosGlobal } from "../../helpers/DB/loadAutorizadosGlobal";
import { loadAvanceSuperficieExpedida } from "../../helpers/DB/loadAvanceSuperficieExpedida";
import { types } from "../../types/types";

export const openImprimirReporteModal = () => ({
	type: types.openImprimirReporteModal
});

export const closeImprimirReporteModal = () => ({
	type: types.closeImprimirReporteModal
});

export const startSetExpedicion = (ciclo) => {
	return async (dispatch) => {
		const expedicion = await loadAvanceSuperficieExpedida(ciclo);
		dispatch(setExpedicion(expedicion));
	};
};

export const startSetAutorizados = (ciclo) => {
	return async (dispatch) => {
		const autorizados = await loadAutorizadosGlobal(ciclo);
		dispatch(setAutorizados(autorizados));
	};
};

export const setExpedicion = (expedicion) => ({
	type: types.setExpedicion,
	payload: expedicion
});

export const setAutorizados = (autorizados) => ({
	type: types.setAutorizados,
	payload: autorizados
});
