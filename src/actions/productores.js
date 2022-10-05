import { types } from "../types/types";
import { loadProductores } from "../helpers/loadProductores";
import { goToElement } from "../helpers/functions/assets";
import { loadConcesiones } from "../helpers/DB/loadConcesiones";

export const openProductoresModal = () => ({
	type: types.altaPermisoOpenProductoresModal
});

export const closeProductoresModal = () => ({
	type: types.altaPermisoCloseProductoresModal
});

export const startLoadProductores = (productor) => {
	return async (dispatch, getState) => {
		const state = getState();

		const productores = await loadProductores(productor);
		const idsProductores = productores.map((productor) => productor.id);

		const concesiones = await loadConcesiones(
			state.auth.variablesGlobales.cicloActual,
			idsProductores
		);

		productores.forEach((productor) => {
			const concesionesProductor = concesiones.filter(
				(concesion) => concesion.idProductor === productor.id
			);
			if (concesionesProductor.length > 0) productor.concesiones = [...concesionesProductor];
		});

		dispatch(setProductores(productores));
	};
};

export const setProductores = (productores) => ({
	type: types.loadProductores,
	payload: productores
});

export const setProductorSelected = (idProductor) => {
	goToElement("variedadInput");
	return {
		type: types.setProductor,
		payload: idProductor
	};
};

export const unsetProductorSelected = () => ({
	type: types.unsetProductor
});
