import { types } from "../types/types";

const initialState = {
	enEspera: false,
	enableSaveButton: true,
	enablePrintButton: false,
	openUsuariosModal: false,
	openProductoresModal: false,
	isOpenNuevoProductorModal: false,
	openCultivosModal: false,
	openCultivoAnteriorModal: false,
	isOpenPrintPermisoModal: false,
	usuarios: [],
	cultivos: [],
	cultivosAnteriores: [],
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
	nombreProductor: null,
	rfcProductor: null,
	productorIncumplido: null,
	idCultivoSelected: null,
	nombreCultivo: null,
	claveCultivo: null,
	subciclo: null,
	cuotaCultivo: null,
	supPrevia: 0,
	idCultivoAnteriorSelected: null,
	cultivoAnterior: null,
	claveCultivoAnterior: null,
	tipo: "normal",
	ciclo: null,
	numeroPermiso: null,
	fechaEmicion: null,
	fechaLimite: null,
	vigencia: null,
	estadoPermiso: null,
	variedad: "",
	supAutorizada: 0,
	fuenteCredito: "",
	latitud: "",
	longitud: "",
	observaciones: ""
};

export const altaPermisosReducer = (state = initialState, action) => {
	switch (action.type) {
		//Print Permiso **************************************

		case types.altaPermisoOpenPrintPermisoModal:
			return {
				...state,
				openPrintPermisoModal: true
			};

		case types.altaPermisoClosePrintPermisoModal:
			return {
				...state,
				openPrintPermisoModal: false
			};

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

		case types.altaPermisoOpenCultivoAnteriorModal:
			return {
				...state,
				openCultivoAnteriorModal: true
			};

		case types.altaPermisoCloseCultivoAnteriorModal:
			return {
				...state,
				openCultivoAnteriorModal: false
			};

		case types.loadCultivos:
			return {
				...state,
				cultivos: action.payload
			};

		case types.setCultivosAnteriores:
			return {
				...state,
				cultivosAnteriores: action.payload
			};

		case types.clearCultivos:
			return {
				...state,
				cultivos: []
			};

		case types.setCultivo:
			return {
				...state,
				idCultivoSelected: action.payload.id,
				nombreCultivo: action.payload.nombre,
				claveCultivo: action.payload.clave,
				subciclo: action.payload.subciclo,
				cuotaCultivo: action.payload.costoHectarea,
				inicioBc: action.payload.inicioBc,
				finBc: action.payload.finBc,
				inicioSonora: action.payload.inicioSonora,
				finSonora: action.payload.finSonora,
				superficiePreviaCultivo: action.payload.superficiePrevia
			};

		case types.setCuotaCultivo:
			return {
				...state,
				cuotaCultivo: action.payload
			};

		case types.unsetCultivo:
			return {
				...state,
				idCultivoSelected: null,
				nombreCultivo: null,
				claveCultivo: null,
				subciclo: null,
				cuotaCultivo: null
			};

		case types.setCultivoAnterior:
			return {
				...state,
				idCultivoAnteriorSelected: action.payload.id,
				cultivoAnterior: action.payload.nombre,
				claveCultivoAnterior: action.payload.clave
			};

		case types.unsetCultivoAnterior:
			return {
				...state,
				idCultivoAnteriorSelected: null,
				cultivoAnterior: null,
				claveCultivoAnterior: null
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

		case types.setUsuarios:
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
				localidad: action.payload.localidad,
				municipio: action.payload.municipio,
				estado: action.payload.estado,
				modulo: action.payload.modulo,
				zona: action.payload.zona,
				seccion: action.payload.seccion,
				canal: `${action.payload.cp}-${action.payload.lt}-${action.payload.slt}-${action.payload.ra}-${action.payload.sra}-${action.payload.ssra}`,
				toma: action.payload.pControl,
				sistema: action.payload.sistRiego,
				supPrevia: action.payload.supPrevia,
				reacomodo: action.payload.reacomodo,
				nombreLocalidad: action.payload.nombreLocalidad,
				tipoLocalidad: action.payload.tipoLocalidad,
				claveLocalidad: action.payload.ejido,
				dictamen: action.payload.dictamen,
				laboresPendientes: action.payload.laboresPendientes
			};

		case types.unsetUsuario:
			return {
				...state,
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
				sistema: null
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
				idProductorSelected: action.payload.id,
				nombreProductor: `${action.payload.apPaterno} ${action.payload.apMaterno} ${action.payload.nombre}`,
				rfcProductor: action.payload.rfc,
				curpProductor: action.payload.curp,
				productorIncumplido: action.payload.incumplido ? action.payload.incumplido : false
			};

		case types.unsetProductor:
			return {
				...state,
				idProductorSelected: null,
				nombreProductor: null,
				rfcProductor: null,
				productorIncumplido: null
			};

		//Nuevo Productor **************************************

		case types.altaPermisoOpenNuevoProductorModal:
			return {
				...state,
				isOpenNuevoProductorModal: true
			};

		case types.altaPermisoCloseNuevoProductorModal:
			return {
				...state,
				isOpenNuevoProductorModal: false
			};

		//Set Form *****************************************************

		case types.altaPermisosSetFormValues:
			return {
				...state,
				supAutorizada: Number(action.payload.supAutorizada),
				variedad: action.payload.variedad,
				fuenteCredito: action.payload.fuenteCredito,
				latitud: action.payload.latitud,
				longitud: action.payload.longitud,
				observaciones: action.payload.observaciones
			};

		// Al guardar

		case types.altaPermisosSetSubmitData:
			return {
				...state,
				tipo: action.payload.tipo,
				ciclo: action.payload.ciclo,
				numeroPermiso: action.payload.numeroPermiso,
				fechaEmicion: action.payload.fechaEmicion,
				fechaLimite: action.payload.fechaLimite,
				vigencia: action.payload.vigencia,
				estadoPermiso: action.payload.estadoPermiso
			};

		case types.altaPermisosUnsetSubmitData:
			return {
				...state,
				// tipo: null,
				ciclo: null,
				numeroPermiso: null,
				fechaEmicion: null,
				fechaLimite: null,
				vigencia: null
			};

		case types.altaPermisosSetEnEspera:
			return {
				...state,
				enEspera: true
			};

		case types.altaPermisosUnsetEnEspera:
			return {
				...state,
				enEspera: false
			};

		case types.altaPermisosEnableSaveButton:
			return {
				...state,
				enableSaveButton: true
			};

		case types.altaPermisosDisableSaveButton:
			return {
				...state,
				enableSaveButton: false
			};

		case types.altaPermisosEnablePrintButton:
			return {
				...state,
				enablePrintButton: true
			};

		case types.altaPermisosDisablePrintButton:
			return {
				...state,
				enablePrintButton: false
			};

		case types.setTipoNormal:
			return {
				...state,
				tipo: "normal"
			};

		case types.setTipoExtra:
			return {
				...state,
				tipo: "extra"
			};

		default:
			return state;
	}
};
