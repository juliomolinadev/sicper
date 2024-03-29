import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
	switch (action.type) {
		case types.login:
			return {
				uid: action.payload.uid,
				name: action.payload.displayName,
				email: action.payload.email
			};

		case types.entity:
			return {
				...state,
				entidad: action.payload.entidad,
				img: action.payload.img,
				claveEntidad: action.payload.claveEntidad,
				dotacionGravedad: action.payload.dotacionGravedad,
				dotacionPozo: action.payload.dotacionPozo,
				titular: action.payload.titular,
				direccion: action.payload.direccion,
				expedicionActivaModulo: action.payload.expedicionActivaModulo,
				rol: action.payload.rol,
				modulo: action.payload.modulo
			};

		case types.setPrivilegios:
			return {
				...state,
				privilegios: action.payload
			};

		case types.setVariablesGlobales:
			return {
				...state,
				variablesGlobales: action.payload
			};

		case types.setEstadoExpedicionModulo:
			return {
				...state,
				expedicionActivaModulo: action.payload
			};

		case types.logout:
			return {};

		default:
			return state;
	}
};
