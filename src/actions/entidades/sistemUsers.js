import { types } from "../../types/types";
import { loadSystemUsers } from "../../helpers/loadSystemUsers";
import { removeError } from "../../actions/ui";

export const startLoadSystemUsers = (entidad) => {
	return async (dispatch) => {
		const users = await loadSystemUsers(entidad);
		dispatch(setSystemUsers(users));
	};
};

export const setSystemUsers = (users) => ({
	type: types.setSystemUsers,
	payload: users
});

export const setSystemUserSelected = (user) => ({
	type: types.setSystemUserSelected,
	payload: user
});
export const unsetSystemUserSelected = () => ({
	type: types.unsetSystemUserSelected
});

export const startSetSystemUserSelected = (user) => {
	return (dispatch) => {
		dispatch(removeError());
		dispatch(setSystemUserSelected(user));
	};
};
