import { types } from "../types/types";
import { loadUltimosPermisos } from "../../helpers/loadUltimosPermisos";

export const startLoadPermisos = () => {
	return async (dispatch) => {
		const permisos = await loadUltimosPermisos();
		dispatch(setPermisos(permisos));
	};
};

export const setPermisos = (permisos) => ({
	type: types.permisosScreenLoadPermisos,
	payload: permisos
});
