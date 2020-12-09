import { types } from "../types/types";

export const setModulo = (modulo) => ({
	type: types.autorizadosScreenSetModulo,
	payload: modulo
});

export const unsetModulo = () => ({
	type: types.autorizadosScreenUnsetModulo
});
