import { types } from "../../types/types";
import { loadPermisos } from "../../helpers/loadPermisos";

export const startLoadPermisos = (
	palabra,
	modulo,
	ciclo,
	campos,
	activosCancelados,
	tipoSuperficie,
	sistema
) => {
	return async (dispatch) => {
		const permisos = await loadPermisos(
			palabra,
			modulo,
			ciclo,
			campos,
			activosCancelados,
			tipoSuperficie,
			sistema
		);
		dispatch(setPermisos(permisos));
	};
};

export const setPermisos = (permisos) => ({
	type: types.setPermisos,
	payload: permisos
});

export const unsetPermisos = () => ({
	type: types.unsetPermisos
});
