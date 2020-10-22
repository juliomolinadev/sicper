import { types } from "../types/types";

const initialState = {
	openCultivosModal: false
};

export const altaPermisosReducer = (state = initialState, action) => {
	switch (action.type) {
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

		default:
			return state;
	}
};
