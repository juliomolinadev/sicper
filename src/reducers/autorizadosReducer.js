import { types } from "../types/types";

const initialState = {
	modulo: null,
	openAutorizadosModal: false,
	autorizados: [],
	autorizadoSelected: null
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

		default:
			return state;
	}
};
