import { types } from "../../types/types";
import { loadLocaltiesFromUnassignedPermits } from "../../helpers/loadLocaltiesFromUnassignedPermits";
import { loadLocaltiesGroup } from "../../helpers/loadLocaltiesGroup";

export const startLoadLocaltiesFromUnassignedPermits = () => {
	return async (dispatch) => {
		const localties = await loadLocaltiesFromUnassignedPermits();
		const localtiesData = await loadLocaltiesGroup(localties);
		dispatch(setLocalties(localtiesData));
	};
};

export const setLocalties = (localties) => ({
	type: types.setLocalties,
	payload: localties
});

export const unsetLocalties = () => ({
	type: types.unsetLocalties
});

export const setSelectedLocalties = (localties) => ({
	type: types.setSelectedLocalties,
	payload: localties
});

export const unsetSelectedLocalties = () => ({
	type: types.unsetSelectedLocalties
});
