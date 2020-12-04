import { types } from "../types/types";
import { loadUltimosPermisos } from "../helpers/loadUltimosPermisos";
import { loadPermisos } from "../helpers/loadPermisos";

export const startLoadPermisos = () => {
	return async (dispatch) => {
		const permisos = await loadUltimosPermisos();
		dispatch(setPermisos(permisos));
	};
};

export const startLoadPermisosSearch = (palabra) => {
	return async (dispatch) => {
		const permisos = await loadPermisos(palabra);
		dispatch(setPermisos(permisos));
	};
};

export const setPermisos = (permisos) => ({
	type: types.permisosScreenSetPermisos,
	payload: permisos
});

export const unsetPermisos = () => ({
	type: types.permisosScreenUnsetPermisos
});

export const setPermisoSelected = (permiso) => ({
	type: types.permisosScreenSetPermisoSelected,
	payload: permiso.id
});

export const unsetPermisoSelected = () => ({
	type: types.permisosScreenUnsetPermisoSelected
});
