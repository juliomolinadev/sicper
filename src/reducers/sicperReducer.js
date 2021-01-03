import { types } from "../types/types";

const initialState = {
	autorizados: []
};

export const sicperReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.sicperScreenSetAutorizados:
			return {
				...state,
				autorizados: action.payload
			};

		case types.sicperScreenUnsetAutorizados:
			return {
				...state,
				autorizados: []
			};

		default:
			return state;
	}
};
