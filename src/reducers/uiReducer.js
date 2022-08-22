import { types } from "../types/types";

const initialState = {
	loading: false,
	msgError: null,
	updatingPermisos: false
};

export const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.uiSetError:
			return {
				...state,
				msgError: action.payload
			};

		case types.uiRemoveError:
			return {
				...state,
				msgError: null
			};

		case types.uiStartLoading:
			return {
				...state,
				loading: true
			};

		case types.uiFinishLoading:
			return {
				...state,
				loading: false
			};

		case types.openUserRoleModal:
			return {
				...state,
				isOpenUserRoleModal: true
			};

		case types.closeUserRoleModal:
			return {
				...state,
				isOpenUserRoleModal: false
			};

		case types.setUpdatingPermisos:
			return {
				...state,
				updatingPermisos: true
			};

		case types.unsetUpdatingPermisos:
			return {
				...state,
				updatingPermisos: false
			};

		case types.setEntidadesConAcceso:
			return {
				...state,
				entidadesConAcceso: action.payload
			};

		default:
			return state;
	}
};
