import { types } from "../types/types";

const initialState = {
	printTransferModal: false,
	nuevaTransferencia: null,
	transferencia: null,
	transferPrintButton: false,
	transferencias: []
};

export const transferenciasScreenReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.openTransferModal:
			return {
				...state,
				printTransferModal: true
			};

		case types.closeTransferModal:
			return {
				...state,
				printTransferModal: false
			};

		case types.enablePrintButton:
			return {
				...state,
				transferPrintButton: true
			};

		case types.disablePrintButton:
			return {
				...state,
				transferPrintButton: false
			};

		case types.setNuevaTransferencia:
			return {
				...state,
				nuevaTransferencia: action.payload
			};

		case types.unsetNuevaTransferencia:
			return {
				...state,
				nuevaTransferencia: null
			};

		case types.setTransferencia:
			return {
				...state,
				transferencia: action.payload
			};

		case types.unsetTransferencia:
			return {
				...state,
				transferencia: null
			};

		case types.setTransferencias:
			return {
				...state,
				transferencias: action.payload
			};

		case types.unsetTransferencias:
			return {
				...state,
				transferencias: []
			};

		default:
			return state;
	}
};
