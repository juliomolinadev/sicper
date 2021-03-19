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

		default:
			return state;
	}
};
