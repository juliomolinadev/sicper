import { types } from "../types/types";

const initialState = {
	expedicion: null,
	superficie: "normal"
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

		case types.sicperScreenSetSuperficieNormal:
			return {
				...state,
				superficie: "normal"
			};

		case types.sicperScreenSetSuperficieExtra:
			return {
				...state,
				superficie: "extra"
			};

		default:
			return state;
	}
};
