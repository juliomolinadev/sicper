import { types } from "../types/types";

const initialState = {
	modulo: null
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

		default:
			return state;
	}
};
