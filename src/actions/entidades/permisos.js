import { types } from "../../types/types";
import { loadPermisos } from "../../helpers/loadPermisos";

export const startLoadPermisos = (
	palabra,
	modulo,
	ciclo,
	campos,
	activosCancelados,
	tipoSuperficie,
	sistema,
	fechaInicial,
	fechaFinal
) => {
	return async (dispatch) => {
		const permisos = await loadPermisos(
			palabra,
			modulo,
			ciclo,
			campos,
			activosCancelados,
			tipoSuperficie,
			sistema,
			fechaInicial,
			fechaFinal
		);
		dispatch(setPermisos(permisos));
		dispatch(setCampoOrdenador(campos[0]));
	};
};

export const setPermisos = (permisos) => ({
	type: types.setPermisos,
	payload: permisos
});

export const unsetPermisos = () => ({
	type: types.unsetPermisos
});

export const setCampoOrdenador = (campo) => ({
	type: types.setCampoOrdenador,
	payload: campo
});

export const unsetCampoOrdenador = () => ({
	type: types.unsetCampoOrdenador
});
