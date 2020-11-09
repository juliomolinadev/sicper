import { types } from "../types/types";

const initialState = {
	openUsuariosModal: false,
	openProductoresModal: false,
	openNuevoProductorModal: false,
	openCultivosModal: false,
	usuarios: [],
	cultivos: [],
	productores: [],
	idUsuarioSelected: null,
	cuenta: "desde derechos",
	usuario: "desde derechos",
	supDerecho: "desde derechos",
	lote: "desde derechos",
	localidad: "desde derechos",
	municipio: "desde derechos",
	estado: "desde derechos",
	modulo: "desde derechos",
	seccion: "desde derechos",
	canal: "desde derechos",
	toma: "desde derechos",
	sistema: "desde derechos",
	idProductorSelected: null,
	nombreProductor: "desde productores",
	rfcProductor: "desde productores",
	idCultivoSelected: null,
	subciclo: "desde cultivos",
	supPrevia: "desde permisos",
	tipo: "desde autorizados",
	presidente: "desde entidades",
	dotacion: "desde entidades",
	ciclo: "se calcula al guardar",
	numeroPermiso: "se calcula al guardar",
	fechaEmicion: "se calcula al guardar",
	fechaLimite: "se calcula al guardar",
	vigencia: "se calcula al guardar",
	folioSanidad: "se calcula al guardar",
	supDisponible: "se calcula al guardar",
	cuotas: "se calcula al guardar",
	supAutorizada: "desde formulario",
	variedad: "desde formulario",
	fuenteCredito: "desde formulario",
	latitud: "desde formulario",
	longitud: "desde formulario",
	cultivoAnterior: "desde formulario",
	observaciones: "desde formulario"
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
				idUsuarioSelected: action.payload
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
