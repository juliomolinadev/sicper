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
