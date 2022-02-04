import { types } from "../types/types";
import { loadPermisosAlgodonero } from "../helpers/loadPermisosAlgodonero";
import { loadSuperficiesCultivos } from "../helpers/loadSuperficiesCultivos";
import { loadSearchPermisosAlgodonero } from "../helpers/loadSearchPermisosAlgodonero";
import { getConstanciaSanidadCount } from "../helpers/DB/getCostanciaSanidadCount";
import { disablePrintButton, enablePrintButton } from "./transferenciasScreen";

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

export const openSanidadModal = (permiso) => ({
	type: types.openSanidadModal,
	payload: permiso
});

export const closeSanidadModal = () => ({
	type: types.closeSanidadModal
});

export const startCloseSanidadModal = () => {
	return (dispatch) => {
		dispatch(disablePrintButton());
		dispatch(closeSanidadModal());
	};
};

const fill = (number, len) => "0".repeat(len - number.toString().length) + number.toString();

const defineFolio = (counter) => {
	if (counter !== false) {
		const folio = `CESVBC-${fill(counter + 1, 4)}`;
		return folio;
	} else return null;
};

export const startOpenSanidadModal = (ciclo, permiso) => {
	return async (dispatch) => {
		if (permiso.folioSanidad) {
			dispatch(enablePrintButton());
			dispatch(openSanidadModal(permiso));
		} else {
			const counter = await getConstanciaSanidadCount(ciclo);
			const folioSanidad = defineFolio(counter);

			dispatch(openSanidadModal({ ...permiso, folioSanidad }));
		}
	};
};

export const updatePermiso = (permiso) => ({
	type: types.updatePermiso,
	payload: permiso
});

export const deletePermiso = (id) => ({
	type: types.deletePermiso,
	payload: id
});

export const setTechniciansLabores = (technicians) => ({
	type: types.setTechniciansLabores,
	payload: technicians
});
