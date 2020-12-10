import { types } from "../types/types";

const initialState = {
	modulo: null,
	autorizados: {}
};

export const autorizadosReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.autorizadosScreenSetModulo:
			return {
				...state,
				modulo: action.payload
			};

		case types.autorizadosScreenUnsetModulo:
			return {
				...state,
				modulo: null
			};

		case types.autorizadosScreenSetAutorizados:
			return {
				...state,
				autorizados: action.payload
			};

		case types.autorizadosScreenUnsetAutorizados:
			return {
				...state,
				autorizados: {}
			};

		default:
			return state;
	}
};
