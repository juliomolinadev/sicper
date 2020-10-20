import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case types.login:
			return {
				uid: action.payload.uid,
				name: action.payload.displayName,
				entidad: action.payload.entidad,
				img: action.payload.img
			};

		case types.logout:
			return {};

		default:
			return state;
	}
};
