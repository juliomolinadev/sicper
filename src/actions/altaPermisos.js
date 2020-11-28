import { types } from "../types/types";

export const setFormValues = (values) => ({
	type: types.altaPermisosSetFormValues,
	payload: values
});

export const setOnSubmitData = (data) => ({
	type: types.altaPermisosSetSubmitData,
	payload: data
});

export const unsetOnSubmitData = () => ({
	type: types.altaPermisosUnsetSubmitData
});

export const openPrintPermisoModal = () => ({
	type: types.altaPermisoOpenPrintPermisoModal
});

export const closePrintPermisoModal = () => ({
	type: types.altaPermisoClosePrintPermisoModal
});

export const setSavedPermiso = () => ({
	type: types.altaPermisosSetSavedPermiso
});

export const unsetSavedPermiso = () => ({
	type: types.altaPermisosUnsetSavedPermiso
});

export const startEnableSaveButton = () => ({
	type: types.altaPermisosEnableSaveButton
});

export const startDisableSaveButton = () => ({
	type: types.altaPermisosDisableSaveButton
});

export const startEnablePrintButton = () => ({
	type: types.altaPermisosEnablePrintButton
});

export const startDisablePrintButton = () => ({
	type: types.altaPermisosDisablePrintButton
});
