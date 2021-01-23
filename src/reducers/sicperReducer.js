import { types } from "../types/types";

const initialState = {
	expedicion: null
};

export const sicperReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.sicperScreenSetExpedicion:
			return {
				...state,
				expedicion: action.payload
			};

		case types.sicperScreenUnsetExpedicion:
			return {
				...state,
				expedicion: null
			};

		default:
			return state;
	}
};
