import { types } from "../../types/types";

const initialState = {
	reportesScreen: {
		openImprimirReporteModal: false
	},
	padronScreen: {
		updatingPadron: false,
		updatingReacomodos: false
	}
};

export const scenesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.openImprimirReporteModal:
			return {
				...state,
				reportesScreen: {
					openImprimirReporteModal: true
				}
			};

		case types.closeImprimirReporteModal:
			return {
				...state,
				reportesScreen: {
					openImprimirReporteModal: false
				}
			};

		case types.setUpdatingPadron:
			return {
				...state,
				padronScreen: {
					updatingPadron: true
				}
			};

		case types.unsetUpdatingPadron:
			return {
				...state,
				padronScreen: {
					updatingPadron: false
				}
			};

		case types.setUpdatingReacomodos:
			return {
				...state,
				padronScreen: {
					updatingReacomodos: true
				}
			};

		case types.unsetUpdatingReacomodos:
			return {
				...state,
				padronScreen: {
					updatingReacomodos: false
				}
			};

		default:
			return state;
	}
};
