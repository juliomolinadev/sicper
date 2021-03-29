import { types } from "../../types/types";

const initialState = {
	reportesScreen: {
		openImprimirReporteModal: false
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

		default:
			return state;
	}
};
