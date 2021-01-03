import { loadAutorizados } from "../helpers/loadAutorizados";
import { types } from "../types/types";

export const startLoadAutorizados = (modulo) => {
	return async (dispatch) => {
		const autorizados = await loadAutorizados(modulo);

		let superficieReferencia = 0;
		autorizados.forEach((autorizado) => {
			superficieReferencia += autorizado.normalGravedad;
			superficieReferencia += autorizado.extraGravedad;
			superficieReferencia += autorizado.asignadaGravedad;
			superficieReferencia += autorizado.normalPozoFederal;
			superficieReferencia += autorizado.extraPozoFederal;
			superficieReferencia += autorizado.asignadaPozoFederal;
			superficieReferencia += autorizado.normalPozoParticular;
			superficieReferencia += autorizado.extraPozoParticular;
			superficieReferencia += autorizado.asignadaPozoParticular;
		});
		dispatch(setAutorizados(autorizados));
		dispatch(setSuperficieReferencia(superficieReferencia));
	};
};

export const setAutorizados = (autorizados) => ({
	type: types.autorizadosScreenSetAutorizados,
	payload: autorizados
});

export const unsetAutorizados = () => ({
	type: types.autorizadosScreenUnsetAutorizados
});
