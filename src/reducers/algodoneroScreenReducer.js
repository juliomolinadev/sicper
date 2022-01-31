import { types } from "../types/types";

const initialState = {
	permisos: [],
	permisoSelected: null,
	printSanidadModal: false
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
				printSanidadModal: action.payload
			};

		case types.closeSanidadModal:
			return {
				...state,
				printSanidadModal: false
			};

		case types.setFolioSanidad:
			return {
				...state,
				permisoSelected: { ...state.permisoSelected, folioSanidad: action.payload }
			};

		case types.updatePermiso:
			const newPermits = state.permisos.map((permiso) => {
				if (permiso.id === action.payload.id) return action.payload;
				else return permiso;
			});
			return {
				...state,
				permisos: newPermits
			};

		default:
			return state;
	}
};
