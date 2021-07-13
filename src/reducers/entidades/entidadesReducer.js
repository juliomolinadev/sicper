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

		case types.setUserRoles:
			return {
				...state,
				userRoles: action.payload
			};

		case types.unsetUserRoles:
			return {
				...state,
				userRoles: false
			};

		case types.setUserRoleSelected:
			return {
				...state,
				userRoleSelected: action.payload
			};

		case types.unsetUserRoleSelected:
			return {
				...state,
				userRoleSelected: false
			};

		case types.setPrivilegesToEdit:
			return {
				...state,
				privilegesToEdit: action.payload
			};

		case types.unsetPrivilegesToEdit:
			return {
				...state,
				privilegesToEdit: false
			};

		case types.setSystemUsers:
			return {
				...state,
				systemUsers: action.payload
			};

		case types.setSystemUserSelected:
			return {
				...state,
				systemUserSelected: action.payload
			};

		case types.unsetSystemUserSelected:
			return {
				...state,
				systemUserSelected: null
			};

		case types.setLocalties:
			return {
				...state,
				localties: action.payload
			};

		case types.unsetLocalties:
			return {
				...state,
				localties: null
			};

		case types.setSelectedLocalties:
			return {
				...state,
				selectedLocalties: action.payload
			};

		case types.unsetSelectedLocalties:
			return {
				...state,
				selectedLocalties: null
			};

		case types.setLocaltieSelected:
			return {
				...state,
				localtieSelected: action.payload
			};
		case types.unsetLocaltieSelected:
			return {
				...state,
				localtieSelected: null
			};
		case types.openLocaltiesModal:
			return {
				...state,
				openLocaltiesModal: true
			};
		case types.closeLocaltiesModal:
			return {
				...state,
				openLocaltiesModal: false
			};

		default:
			return state;
	}
};
