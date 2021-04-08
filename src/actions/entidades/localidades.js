import { types } from "../../types/types";
import { loadLocaltiesFromUnassignedPermits } from "../../helpers/loadLocaltiesFromUnassignedPermits";

export const startLoadLocaltiesFromUnassignedPermits = async () => {
	const localties = await loadLocaltiesFromUnassignedPermits();
};

export const setLocalties = (localties) => ({
	type: types.setLocalties,
	payload: localties
});
