import { types } from "../types/types";
import { loadProductores } from "../helpers/loadProductores";
import { goToElement } from "../helpers/functions/assets";

export const openProductoresModal = () => ({
	type: types.altaPermisoOpenProductoresModal
});

export const closeProductoresModal = () => ({
	type: types.altaPermisoCloseProductoresModal
});

export const startLoadProductores = (productor) => {
	return async (dispatch) => {
		const productores = await loadProductores(productor);
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
