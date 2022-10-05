import { types } from "../types/types";

const initialState = {};

export const padronScreenReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.setPadronesCultivos:
			return {
				...state,
				padrones: action.payload
			};

		case types.setConcesionSelected:
			return {
				...state,
				concesionSelected: action.payload
			};

		default:
			return state;
	}
};
