import { loadAutorizados } from "../helpers/loadAutorizados";
import { types } from "../types/types";
import { loadExpedicion } from "../helpers/loadExpedicion";

export const startLoadExpedicion = (modulo) => {
	return async (dispatch) => {
		const expedicion = await loadExpedicion(modulo);
		const autorizados = await loadAutorizados(modulo);

		let superficies = [];
		expedicion.forEach((cultivoExpedido) => {
			autorizados.forEach((cultivoAutorizado) => {
				if (cultivoExpedido.id === `${cultivoAutorizado.clave}-${cultivoAutorizado.cultivo}`) {
					superficies.push({ ...cultivoAutorizado, ...cultivoExpedido });
				}
			});
		});

		superficies.forEach((cultivo) => {
			if (cultivo.gravedad === undefined) cultivo.gravedad = 0;
			if (cultivo.pozoFederal === undefined) cultivo.pozoFederal = 0;
			console.log("pozoFederal en for: ", cultivo.pozoFederal);
		});

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
