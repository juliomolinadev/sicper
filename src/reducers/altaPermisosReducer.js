import { types } from "../types/types";

const initialState = {
	openCultivosModal: false,
	cultivos: [],
	cultivoSelected: null
};

export const altaPermisosReducer = (state = initialState, action) => {
	switch (action.type) {
		//Alta permisos screen****************************
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

		//Cultivos **************************************
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

		default:
			return state;
	}
};
