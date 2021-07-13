import { types } from "../../types/types";
import { loadLocaltiesFromUnassignedPermits } from "../../helpers/loadLocaltiesFromUnassignedPermits";
import { loadLocaltiesGroup } from "../../helpers/loadLocaltiesGroup";
import { assignTechnician } from "../../helpers/assignTechnician";
import { loadLocalties } from "../../helpers/DB/loadLocalties";

export const startLoadLocaltiesFromUnassignedPermits = () => {
	return async (dispatch) => {
		const localties = await loadLocaltiesFromUnassignedPermits();
		const localtiesData = await loadLocaltiesGroup(localties);
		dispatch(setLocalties(localtiesData));
	};
};

export const startAssignTechnician = (ciclo, modulo, localtiesNames, uid) => {
	assignTechnician(ciclo, modulo, localtiesNames, uid);

	return async (dispatch) => {
		await dispatch(startLoadLocaltiesFromUnassignedPermits());
		dispatch(unsetLocalties());
		dispatch(unsetSelectedLocalties());
	};
};

export const startLoadLocalties = (localtie) => {
	return async (dispatch) => {
		const localties = await loadLocalties(localtie);
		dispatch(setLocalties(localties));
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

export const setLocaltieSelected = (localtie) => ({
	type: types.setLocaltieSelected,
	payload: localtie
});

export const unsetLocaltieSelected = () => ({
	type: types.unsetLocaltieSelected
});

export const openLocaltiesModal = () => ({
	type: types.openLocaltiesModal
});

export const closeLocaltiesModal = () => ({
	type: types.closeLocaltiesModal
});
