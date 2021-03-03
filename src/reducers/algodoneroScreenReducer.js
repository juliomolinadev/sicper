import { types } from "../types/types";

const initialState = {
	permisos: [],
	permisoSelected: null,
	printSanidadModal: true
};

export const algodoneroScreenReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.algodoneroScreenSetPermisos:
			return {
				...state,
				permisos: action.payload
			};

		case types.algodoneroScreenUnsetPermisos:
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

		case types.openSanidadModal:
			return {
				...state,
				printSanidadModal: true
			};

		case types.closeSanidadModal:
			return {
				...state,
				printSanidadModal: false
			};

		default:
			return state;
	}
};
