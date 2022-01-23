import { types } from "../types/types";

// const initialState = {
//     technicians: [],
//     technicianSelected: null,
//     permits: [],
//     permitSelected: null
// };

export const asignacionReducer = (state, action) => {
	switch (action.type) {
		case types.setLocaltiesAsignacion:
			return { ...state, localties: action.payload };

		case types.setSelectedLocaltiesAsignacion:
			return { ...state, selectedLocalties: action.payload };

		case types.setTechnicians:
			return { ...state, technicians: action.payload };

		case types.setTechnicianSelected:
			return { ...state, technicianSelected: action.payload };

		case types.setBusqueda:
			return { ...state, palabra: action.payload };

		case types.updateTechnicians:
			const updatedTechnicians = [];
			state.technicians.forEach((technician, i) => {
				updatedTechnicians.push(technician);
				action.payload.forEach((updatedTech) => {
					if (technician.id === updatedTech.id) {
						updatedTechnicians[i].modulos = updatedTech.modulos;
					}
				});
			});

			return {
				...state,
				technicians: updatedTechnicians
			};

		default:
			return state;
	}
};
