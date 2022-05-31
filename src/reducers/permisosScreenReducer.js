import { types } from "../types/types";

const initialState = {
	permisos: [],
	permisoSelected: null,
	superficies: null,
	guia: null,
	isGuiaFormModalOpen: false,
	isGuiaPrintModalOpen: false
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

		case types.permisosScreenSetPermitToCancel:
			return {
				...state,
				permitToCancelSelected: action.payload
			};

		case types.permisosScreenUnsetPermitToCancel:
			return {
				...state,
				permitToCancelSelected: null
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

		case types.openGuiaForm:
			return {
				...state,
				isGuiaFormModalOpen: true
			};

		case types.closeGuiaForm:
			return {
				...state,
				isGuiaFormModalOpen: false
			};

		case types.openGuiaPrint:
			return {
				...state,
				isGuiaPrintModalOpen: true
			};

		case types.closeGuiaPrint:
			return {
				...state,
				isGuiaPrintModalOpen: false
			};

		case types.setGuiaSaved:
			return {
				...state,
				guia: {
					...state.guia,
					guardado: true
				}
			};

		case types.setFolioGuia:
			return {
				...state,
				guia: {
					...state.guia,
					folio: action.payload
				}
			};

		case types.setDataGuia:
			return {
				...state,
				guia: {
					...state.guia,
					...action.payload
				}
			};

		case types.clearGuia:
			return {
				...state,
				guia: null
			};

		default:
			return state;
	}
};
