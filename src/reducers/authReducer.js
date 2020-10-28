import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
	console.log("En reducer", action);
	switch (action.type) {
		case types.login:
			return {
				uid: action.payload.uid,
				name: action.payload.displayName
			};

		case types.entity:
			return {
				...state,
				entidad: action.payload.entidad,
				img: action.payload.img,
				claveEntidad: action.payload.claveEntidad
			};

		case types.logout:
			return {};

		default:
			return state;
	}
};
