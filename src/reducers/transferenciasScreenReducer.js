import { types } from "../types/types";

const initialState = {
	printTransferModal: false,
	transferencia: null
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

		case types.setTransferencia:
			console.log("action.payload en reducer: ", action.payload);
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
