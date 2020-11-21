import { types } from "../types/types";

export const setFormValues = (values) => ({
	type: types.altaPermisosSetFormValues,
	payload: values
});

export const setTipoPermiso = (tipoPermiso) => ({
	type: types.altaPermisosSetTipoPermiso,
	payload: tipoPermiso
});

export const unsetTipoPermiso = () => ({
	type: types.altaPermisosUnsetTipoPermiso
});
