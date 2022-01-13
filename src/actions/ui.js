import { types } from "../types/types";

export const setError = (err) => ({
	type: types.uiSetError,
	payload: err
});

export const removeError = () => ({
	type: types.uiRemoveError
});

export const startLoading = () => ({
	type: types.uiStartLoading
});

export const finishLoading = () => ({
	type: types.uiFinishLoading
});

export const openUserRoleModal = () => ({
	type: types.openUserRoleModal
});

export const closeUserRoleModal = () => ({
	type: types.closeUserRoleModal
});

export const setUpdatingPermisos = () => ({
	type: types.setUpdatingPermisos
});

export const unsetUpdatingPermisos = () => ({
	type: types.unsetUpdatingPermisos
});
