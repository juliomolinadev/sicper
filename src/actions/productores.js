import { types } from "../types/types";
import { loadProductores } from "../helpers/loadProductores";
import { goToElement } from "../helpers/functions/assets";
import { loadConcesiones } from "../helpers/DB/loadConcesiones";
import { loadComplementos } from "../helpers/loadComplementos";

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

export const startSetProductorSelected = (productor) => {
	return async (dispatch, getState) => {
		const state = getState();
		const complementos = await loadComplementos(
			productor.id,
			state.auth.variablesGlobales.cicloActual,
			state.auth.modulo
		);

		dispatch(setProductorSelected(productor));
		dispatch(setComplementos(complementos));
	};
};

export const setProductorSelected = (productor) => {
	goToElement("variedadInput");
	return {
		type: types.setProductor,
		payload: productor
	};
};

export const setComplementos = (permisos) => ({
	type: types.setComplementos,
	payload: permisos
});

export const setPermisosComplemento = (permisos) => ({
	type: types.setPermisosComplemento,
	payload: permisos
});

export const unsetPermisosComplemento = () => ({
	type: types.unsetPermisosComplemento
});

export const unsetProductorSelected = () => ({
	type: types.unsetProductor
});
