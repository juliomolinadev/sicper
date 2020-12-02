import { types } from "../types/types";

export const permisosScreenReducer = (state = {}, action) => {
	switch (action.type) {
		case types.permisosScreenSetPermisos:
			return {
				permisos: action.payload
			};

		case types.permisosScreenUnsetPermisos:
			return {};

		default:
			return state;
	}
};
