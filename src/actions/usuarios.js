import { types } from "../types/types";
import { loadUsuarios } from "../helpers/loadUsuarios";

export const openUsuariosModal = () => ({
	type: types.altaPermisoOpenUsuariosModal
});

export const closeUsuariosModal = () => ({
	type: types.altaPermisoCloseUsuariosModal
});

export const startLoadUsuarios = (usuario) => {
	return async (dispatch) => {
		const usuarios = await loadUsuarios(usuario);
		dispatch(setUsuarios(usuarios));
	};
};

export const setUsuarios = (usuarios) => ({
	type: types.loadUsuarios,
	payload: usuarios
});

export const setUsuarioSelected = (usuario) => ({
	type: types.setUsuario,
	payload: usuario
});

export const unsetUsuarioSelected = () => ({
	type: types.unsetUsuario
});
