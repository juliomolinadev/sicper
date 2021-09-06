import { types } from "../types/types";
import { loadUltimosPermisos } from "../helpers/loadUltimosPermisos";
import { loadPermisos } from "../helpers/loadPermisos";
import { loadSuperficiesCultivos } from "../helpers/loadSuperficiesCultivos";
import { loadPreCancelPermits } from "../helpers/DB/loadPreCancelPermits";

export const startLoadPermisos = (modulo, ciclo) => {
	return async (dispatch) => {
		const permisos = await loadUltimosPermisos(modulo, ciclo);
		dispatch(setPermisos(permisos));
	};
};

export const startLoadPermisosSearch = (palabra, modulo, ciclo) => {
	return async (dispatch) => {
		const permisos = await loadPermisos(palabra, modulo, ciclo);
		dispatch(setPermisos(permisos));
	};
};

export const startLoadPreCancelPermits = (ciclo) => {
	return async (dispatch) => {
		const permisos = await loadPreCancelPermits(ciclo);
		dispatch(setPreCancelPermits(permisos));
	};
};

export const startLoadSuperficies = (modulo, ciclo) => {
	return async (dispatch) => {
		const superficies = await loadSuperficiesCultivos(modulo, ciclo);
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
	type: types.permisosScreenSetPermisos,
	payload: permisos
});

export const unsetPermisos = () => ({
	type: types.permisosScreenUnsetPermisos
});

export const setPreCancelPermits = (permits) => ({
	type: types.permisosScreenSetPreCancelPermits,
	payload: permits
});

export const unsetPreCancelPermits = () => ({
	type: types.permisosScreenUnsetPermisos
});

export const setPermisoSelected = (permiso) => ({
	type: types.permisosScreenSetPermisoSelected,
	payload: permiso.id
});

export const unsetPermisoSelected = () => ({
	type: types.permisosScreenUnsetPermisoSelected
});

export const setPermitToCancel = (permiso) => ({
	type: types.permisosScreenSetPermitToCancel,
	payload: permiso.id
});

export const unsetPermitToCancel = () => ({
	type: types.permisosScreenUnsetPermitToCancel
});
