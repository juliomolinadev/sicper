import { types } from "../types/types";
import { loadCultivos } from "../helpers/loadCultivos";

export const openCultivosModal = () => ({
	type: types.altaPermisoOpenCultivosModal
});

export const closeCultivosModal = () => ({
	type: types.altaPermisoCloseCultivosModal
});

export const startLoadCultivos = (cultivo) => {
	return async (dispatch) => {
		const cultivos = await loadCultivos(cultivo);
		dispatch(setCultivos(cultivos));
	};
};

export const setCultivos = (cultivos) => ({
	type: types.loadCultivos,
	payload: cultivos
});

export const setCultivoSelected = (cultivo) => ({
	type: types.setCultivo,
	payload: cultivo
});

export const unsetCultivoSelected = () => ({
	type: types.unsetCultivo
});
