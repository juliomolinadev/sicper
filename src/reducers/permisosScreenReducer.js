import { types } from "../types/types";

const initialState = {
	permisos: [],
	permisoSelected: null
};

export const permisosScreenReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.permisosScreenSetPermisos:
			return {
				...state,
				permisos: action.payload
			};

		case types.permisosScreenUnsetPermisos:
			return {
				...state,
				permisos: []
			};

		case types.permisosScreenSetPermisoSelected:
			return {
				...state,
				permisoSelected: action.payload
			};

		case types.permisosScreenUnsetPermisoSelected:
			return {
				...state,
				permisoSelected: null
			};

		default:
			return state;
	}
};
