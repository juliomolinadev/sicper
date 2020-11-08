import { types } from "../types/types";

const initialState = {
	openCultivosModal: false,
	cultivos: [],
	cultivoSelected: null,
	openUsuariosModal: false,
	usuarios: [],
	cuentaSelected: null,
	subCuentaSelected: null,
	openProductoresModal: false,
	productores: [],
	productorSelected: null,
	openNuevoProductorModal: true
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
				cuentaSelected: action.payload.cuenta,
				subCuentaSelected: action.payload.subCuenta
			};

		case types.unsetUsuario:
			return {
				...state,
				cuentaSelected: null
			};

		//Productores **************************************

		case types.altaPermisoOpenProductoresModal:
			return {
				...state,
				openProductoresModal: true
			};

		case types.altaPermisoCloseProductoresModal:
			return {
				...state,
				openProductoresModal: false
			};

		case types.loadProductores:
			return {
				...state,
				productores: action.payload
			};

		case types.clearProductores:
			return {
				...state,
				productores: []
			};

		case types.setProductor:
			return {
				...state,
				productorSelected: action.payload
			};

		case types.unsetProductor:
			return {
				...state,
				productorSelected: null
			};

		//Nuevo Productor **************************************

		case types.altaPermisoOpenNuevoProductorModal:
			return {
				...state,
				openNuevoProductorModal: true
			};

		case types.altaPermisoCloseNuevoProductorModal:
			return {
				...state,
				openNuevoProductorModal: false
			};

		default:
			return state;
	}
};
