import { types } from "../types/types";
import { loadPermisosAlgodonero } from "../helpers/loadPermisosAlgodonero";
import { loadSuperficiesCultivos } from "../helpers/loadSuperficiesCultivos";
import { loadSearchPermisosAlgodonero } from "../helpers/loadSearchPermisosAlgodonero";

export const startLoadPermisos = (id) => {
	return async (dispatch) => {
		const permisos = await loadPermisosAlgodonero(id);
		dispatch(setPermisos(permisos));
	};
};

export const startLoadPermisosSearch = (id, palabra) => {
	return async (dispatch) => {
		const permisos = await loadSearchPermisosAlgodonero(id, palabra);
		dispatch(setPermisos(permisos));
	};
};

export const startLoadSuperficies = (modulo) => {
	return async (dispatch) => {
		const superficies = await loadSuperficiesCultivos(modulo);
		dispatch(setSuperficies(superficies));
	};
};

export const setSuperficies = (superficies) => ({
	type: types.permisosScreenSetSuperficies,
	payload: superficies
});

export const unsetSuperficies = () => ({
	type: types.permisosScreenUnsetSuperficies
});

export const setPermisos = (permisos) => ({
	type: types.algodoneroScreenSetPermisos,
	payload: permisos
});

export const unsetPermisos = () => ({
	type: types.algodoneroScreenUnsetPermisos
});

export const setPermisoSelected = (permiso) => ({
	type: types.permisosScreenSetPermisoSelected,
	payload: permiso.id
});

export const unsetPermisoSelected = () => ({
	type: types.permisosScreenUnsetPermisoSelected
});

export const openSanidadModal = () => ({
	type: types.openSanidadModal
});

export const closeSanidadModal = () => ({
	type: types.closeSanidadModal
});
