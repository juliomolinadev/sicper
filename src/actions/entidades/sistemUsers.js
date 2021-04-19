import { types } from "../../types/types";
import { loadSystemUsers } from "../../helpers/loadSystemUsers";
import { removeError } from "../../actions/ui";
import { loadUserRoles } from "../../helpers/loadUserRoles";
import { loadUserPrivileges } from "../../helpers/loadUserPrivileges";

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

export const startSetUserRoles = () => {
	return async (dispatch) => {
		const roles = await loadUserRoles();
		dispatch(setUserRoles(roles));
	};
};

export const setUserRoles = (roles) => ({
	type: types.setUserRoles,
	payload: roles
});

export const setUserRoleSelected = (role) => ({
	type: types.setUserRoleSelected,
	payload: role
});

export const setPrivilegesToEdit = (privileges) => ({
	type: types.setPrivilegesToEdit,
	payload: privileges
});

export const startSetPrivilegesToEdit = (role) => {
	return async (dispatch) => {
		const privileges = await loadUserPrivileges(role);

		dispatch(setUserRoleSelected(role));
		dispatch(setPrivilegesToEdit(privileges));
	};
};
