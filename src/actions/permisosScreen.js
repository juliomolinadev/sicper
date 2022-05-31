import { types } from "../types/types";
import { loadUltimosPermisos } from "../helpers/loadUltimosPermisos";
import { loadPermisos } from "../helpers/loadPermisos";
import { loadSuperficiesCultivos } from "../helpers/loadSuperficiesCultivos";
import { loadPreCancelPermits } from "../helpers/DB/loadPreCancelPermits";
import { loadContadorGuias } from "../helpers/DB/loadContadorGuias";
import { saveGuia } from "../helpers/saveGuia";
import { loadGuia } from "../helpers/DB/loadGuia";

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

export const startSetPermisoSelected = (permiso) => {
	return async (dispatch) => {
		const guia = await loadGuia(permiso);
		if (guia) dispatch(setDataGuia(guia));
		else dispatch(clearGuia());
		dispatch(setPermisoSelected(permiso));
	};
};

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

export const startSetFolioGuia = (ciclo, modulo) => {
	return async (dispatch) => {
		const contador = await loadContadorGuias(ciclo, modulo);

		const fill = (number, len) => "0".repeat(len - number.toString().length) + number.toString();
		const folio = `M${modulo}${fill(contador + 1, 4)}-${ciclo.substring(7, 9)}`;
		dispatch(setFolioGuia(folio));
	};
};

export const startSaveGuia = (ciclo, guia) => {
	return async (dispatch) => {
		const isSaved = await saveGuia(ciclo, guia);
		if (isSaved) {
			dispatch(setGuiaSaved());
		}
	};
};

export const clearGuia = () => ({
	type: types.clearGuia
});

export const setGuiaSaved = () => ({
	type: types.setGuiaSaved
});

export const setDataGuia = (data) => ({
	type: types.setDataGuia,
	payload: data
});

export const setFolioGuia = (folio) => ({
	type: types.setFolioGuia,
	payload: folio
});

export const openGuiaForm = () => ({
	type: types.openGuiaForm
});

export const closeGuiaForm = () => ({
	type: types.closeGuiaForm
});

export const openGuiaPrint = () => ({
	type: types.openGuiaPrint
});

export const closeGuiaPrint = () => ({
	type: types.closeGuiaPrint
});
