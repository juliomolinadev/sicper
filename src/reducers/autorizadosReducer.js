import { types } from "../types/types";

const initialState = {
	modulo: null,
	openAutorizadosModal: false,
	autorizados: [],
	autorizadoSelected: null,
	superficieReferencia: null,
	formError: null
};

export const autorizadosReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.autorizadosScreenSetModulo:
			return {
				...state,
				modulo: action.payload
			};

		case types.autorizadosScreenUnsetModulo:
			return {
				...state,
				modulo: null
			};

		case types.setAutorizadosPorCultivo:
			return {
				...state,
				autorizadosPorCultivo: action.payload
			};

		case types.autorizadosScreenSetAutorizados:
			return {
				...state,
				autorizados: action.payload
			};

		case types.autorizadosScreenUnsetAutorizados:
			return {
				...state,
				autorizados: []
			};

		case types.openAutorizadosModal:
			return {
				...state,
				openAutorizadosModal: true
			};

		case types.closeAutorizadosModal:
			return {
				...state,
				autorizadoSelected: null,
				openAutorizadosModal: false
			};

		case types.setAutorizadoSelected:
			return {
				...state,
				openAutorizadosModal: true,
				autorizadoSelected: action.payload
			};

		case types.unsetAutorizadoSelected:
			return {
				...state,
				openAutorizadosModal: false,
				autorizadoSelected: null
			};

		case types.setSuperficieReferencia:
			return {
				...state,
				superficieReferencia: action.payload
			};

		case types.unsetSuperficieReferencia:
			return {
				...state,
				superficieReferencia: null
			};

		case types.setFormError:
			return {
				...state,
				formError: action.payload
			};

		case types.removeFormError:
			return {
				...state,
				formError: null
			};

		default:
			return state;
	}
};
