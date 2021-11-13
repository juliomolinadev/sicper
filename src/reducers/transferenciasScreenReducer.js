import { types } from "../types/types";

const initialState = {
	printTransferModal: false,
	transferencia: null,
	transferPrintButton: false
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

		default:
			return state;
	}
};
