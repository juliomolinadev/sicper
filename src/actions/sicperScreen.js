import { loadAutorizados } from "../helpers/loadAutorizados";
import { types } from "../types/types";
import { loadExpedicion } from "../helpers/loadExpedicion";

export const startLoadExpedicion = (modulo) => {
	return async (dispatch) => {
		const expedicion = await loadExpedicion(modulo);
		const autorizados = await loadAutorizados(modulo);

		let superficies = [];

		if (expedicion) {
			expedicion.forEach((cultivoExpedido) => {
				autorizados.forEach((cultivoAutorizado) => {
					if (cultivoExpedido.id === `${cultivoAutorizado.clave}-${cultivoAutorizado.cultivo}`) {
						superficies.push({ ...cultivoAutorizado, ...cultivoExpedido });
					}
				});
			});
		}

		superficies.forEach((cultivo) => {
			if (cultivo.gravedadNormal === undefined) cultivo.gravedadNormal = 0;
			if (cultivo.gravedadExtra === undefined) cultivo.gravedadExtra = 0;
			if (cultivo.pozoNormal === undefined) cultivo.pozoNormal = 0;
			if (cultivo.pozoExtra === undefined) cultivo.pozoExtra = 0;
		});

		if (superficies.length === 0) {
			superficies = [
				{
					clave: "-",
					cultivo: "Sin expedicion",
					gravedadNormalAutorizada: 0,
					gravedadNormalAsignada: 0,
					gravedadExtraAutorizada: 0,
					gravedadExtraAsignada: 0,
					pozoNormalAutorizada: 0,
					pozoNormalAsignada: 0,
					pozoExtraAutorizada: 0,
					pozoExtraAsignada: 0,
					gravedadNormal: 0,
					pozoNormal: 0,
					gravedadExtra: 0,
					pozoExtra: 0
				}
			];
		}

		dispatch(setExpedicion(superficies));
	};
};

export const setExpedicion = (superficies) => ({
	type: types.sicperScreenSetExpedicion,
	payload: superficies
});

export const unsetExpedicion = () => ({
	type: types.sicperScreenUnsetExpedicion
});

export const setSuperficieNormal = () => ({
	type: types.sicperScreenSetSuperficieNormal
});

export const setSuperficieExtra = () => ({
	type: types.sicperScreenSetSuperficieExtra
});
