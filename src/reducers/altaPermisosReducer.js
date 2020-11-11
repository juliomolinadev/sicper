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
	cuenta: null,
	usuario: null,
	supDerecho: null,
	lote: null,
	localidad: null,
	municipio: null,
	estado: null,
	modulo: null,
	seccion: null,
	canal: null,
	toma: null,
	sistema: null,
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
				idCultivoSelected: action.payload
			};

		case types.unsetCultivo:
			return {
				...state,
				idCultivoSelected: null
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
				idUsuarioSelected: action.payload.id,
				cuenta: `${action.payload.cuenta}.${action.payload.subcta}`,
				usuario: `${action.payload.apPaterno} ${action.payload.apMaterno} ${action.payload.nombre}`,
				supDerecho: action.payload.supRiego,
				lote: action.payload.predio,
				localidad: action.payload.ejido,
				municipio: action.payload.municipio,
				estado: action.payload.estado,
				modulo: action.payload.modulo,
				seccion: action.payload.seccion,
				canal: `${action.payload.cp}-${action.payload.lt}-${action.payload.slt}-${action.payload.ra}-${action.payload.sra}-${action.payload.ssra}`,
				toma: action.payload.pControl,
				sistema: action.payload.sistRiego
			};

		case types.unsetUsuario:
			return {
				...state,
				idUsuarioSelected: null
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
				idProductorSelected: action.payload
			};

		case types.unsetProductor:
			return {
				...state,
				idProductorSelected: null
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
