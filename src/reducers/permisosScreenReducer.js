import { types } from "../types/types";

const initialState = {
	permisos: [],
	permisoSelected: null,
	superficies: null
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

		case types.permisosScreenSetPreCancelPermits:
			return {
				...state,
				preCancelPermits: action.payload
			};

		case types.permisosScreenUnsetPreCancelPermits:
			return {
				...state,
				preCancelPermits: []
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

		case types.permisosScreenSetSuperficies:
			return {
				...state,
				superficies: action.payload
			};

		case types.permisosScreenUnsetSuperficies:
			return {
				...state,
				superficies: null
			};

		default:
			return state;
	}
};
