import { loadEntities } from "../../helpers/DB/loadEntities";
import { types } from "../../types/types";

export const startLoadEntities = () => {
	return async (dispatch) => {
		const entities = await loadEntities();
		dispatch(setEntities(entities));
	};
};

export const setEntities = (entities) => ({
	type: types.setEntities,
	payload: entities
});
