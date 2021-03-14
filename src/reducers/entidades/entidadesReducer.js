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

		// case types.login:
		// 	return {
		// 		uid: action.payload.uid,
		// 		name: action.payload.displayName
		// 	};

		// case types.entity:
		// 	return {
		// 		...state,
		// 		entidad: action.payload.entidad,
		// 		img: action.payload.img,
		// 		claveEntidad: action.payload.claveEntidad,
		// 		dotacion: action.payload.dotacion,
		// 		titular: action.payload.titular
		// 	};

		// case types.setPrivilegios:
		// 	return {
		// 		...state,
		// 		privilegios: action.payload
		// 	};

		// case types.logout:
		// 	return {};

		default:
			return state;
	}
};
