import { types } from "../types/types";

const initialState = {
	openCultivosModal: false,
	cultivos: [],
	cultivoSelected: null,
	openUsuariosModal: false,
	usuarios: [],
	usuarioSelected: null
};

export const altaPermisosReducer = (state = initialState, action) => {
	switch (action.type) {
		//Cultivos **************************************
		case types.altaPermisoOpenCultivosModal:
			return {
				...state,
				openCultivosModal: true
			};

		case types.altaPermisoCloseCultivosModal:
			return {
				...state,
				openCultivosModal: false
			};

		case types.loadCultivos:
			return {
				...state,
				cultivos: action.payload
			};

		case types.clearCultivos:
			return {
				...state,
				cultivos: []
			};

		case types.setCultivo:
			return {
				...state,
				cultivoSelected: action.payload
			};

		case types.unsetCultivo:
			return {
				...state,
				cultivoSelected: null
			};

		//Usuarios **************************************

		case types.altaPermisoOpenUsuariosModal:
			return {
				...state,
				openUsuariosModal: true
			};

		case types.altaPermisoCloseUsuariosModal:
			return {
				...state,
				openUsuariosModal: false
			};

		case types.loadUsuarios:
			return {
				...state,
				usuarios: action.payload
			};

		case types.clearUsuarios:
			return {
				...state,
				usuarios: []
			};

		case types.setUsuario:
			return {
				...state,
				usuarioSelected: action.payload
			};

		case types.unsetUsuario:
			return {
				...state,
				usuarioSelected: null
			};

		default:
			return state;
	}
};
