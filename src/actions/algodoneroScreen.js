import { types } from "../types/types";
import { loadPermisosAlgodonero } from "../helpers/loadPermisosAlgodonero";
import { loadSuperficiesCultivos } from "../helpers/loadSuperficiesCultivos";
import { loadSearchPermisosAlgodonero } from "../helpers/loadSearchPermisosAlgodonero";
import { getConstanciaSanidadCount } from "../helpers/DB/getCostanciaSanidadCount";

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

export const defineFolioSanidad = (ciclo) => {
	return async (dispatch) => {
		const counter = await getConstanciaSanidadCount(ciclo);
		const folio = defineFolio(counter);
		dispatch(setFolioSanidad(folio));
	};
};

export const setFolioSanidad = (folio) => ({
	type: types.setFolioSanidad,
	payload: folio
});

const fill = (number, len) => "0".repeat(len - number.toString().length) + number.toString();

const defineFolio = (counter) => {
	if (counter !== false) {
		const folio = `CESVBC-${fill(counter + 1, 4)}`;
		return folio;
	} else return null;
};
