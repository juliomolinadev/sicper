import { loadAutorizados } from "../helpers/loadAutorizados";
import { types } from "../types/types";
import { loadExpedicion } from "../helpers/loadExpedicion";

export const startLoadExpedicion = (modulo, ciclo) => {
	return async (dispatch) => {
		const expedicion = await loadExpedicion(modulo, ciclo);
		const autorizados = await loadAutorizados(ciclo, modulo);

		console.log(expedicion);

		const findCultivo = (expedicion, autorizadoId) => {
			if (expedicion) {
				const cultivo = expedicion.find((cultivo) => cultivo.id === autorizadoId);
				return cultivo;
			} else return false;
		};

		let superficies = [];

		if (autorizados) {
			autorizados.forEach((cultivoAutorizado) => {
				if (cultivoAutorizado.superficieTotal > 0) {
					const cultivo = findCultivo(
						expedicion,
						`${cultivoAutorizado.clave}-${cultivoAutorizado.cultivo}`
					);

					if (cultivo) {
						superficies.push({ ...cultivoAutorizado, ...cultivo });
					} else {
						superficies.push({ ...cultivoAutorizado });
					}

					// if (expedicion) {
					// 	expedicion.forEach((cultivoExpedido) => {
					// 		if (
					// 			cultivoExpedido.id === `${cultivoAutorizado.clave}-${cultivoAutorizado.cultivo}`
					// 		) {
					// 			superficies.push({ ...cultivoAutorizado, ...cultivoExpedido });
					// 		}
					// 	});
					// } else {
					// 	superficies.push({ ...cultivoAutorizado });
					// }
				}
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
