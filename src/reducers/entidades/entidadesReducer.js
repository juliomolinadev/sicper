import { types } from "../../types/types";

export const entidadesReducer = (state = {}, action) => {
	switch (action.type) {
		case types.setDataPrincipalesCultivos:
			return {
				...state,
				principalesCultivos: {
					labels: action.payload.labels,
					superficiesCultivos: action.payload.superficiesCultivos,
					numeroPermisos: action.payload.numeroPermisos
				}
			};

		case types.setPermisos:
			return {
				...state,
				permisos: action.payload
			};

		case types.setCampoOrdenador:
			return {
				...state,
				campoOrdenador: action.payload
			};

		case types.setUsuarios:
			return {
				...state,
				usuarios: action.payload
			};

		case types.setUsuario:
			return {
				...state,
				usuario: action.payload
			};

		default:
			return state;
	}
};
