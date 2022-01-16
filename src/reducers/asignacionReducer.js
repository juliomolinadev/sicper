import { types } from "../types/types";

// const initialState = {
//     technicians: [],
//     technicianSelected: null,
//     permits: [],
//     permitSelected: null
// };

export const asignacionReducer = (state, action) => {
	switch (action.type) {
		case types.setTechnicians:
			return { ...state, technicians: action.payload };

		case types.setTechnicianSelected:
			return { ...state, technicianSelected: action.payload };

		default:
			return state;
	}
};
