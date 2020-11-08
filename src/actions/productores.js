import { types } from "../types/types";
import { loadProductores } from "../helpers/loadProductores";

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

export const setProductorSelected = (rfc) => ({
	type: types.setProductor,
	payload: rfc
});

export const unsetProductorSelected = () => ({
	type: types.unsetProductor
});
