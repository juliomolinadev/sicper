import { types } from "../types/types";
import { loadUsuarios } from "../helpers/loadUsuarios";
import { loadLocalidad } from "../helpers/loadLocalidad";
import { loadSuperficiePrevia } from "../helpers/loadSuperficiePrevia";

export const openUsuariosModal = () => ({
	type: types.altaPermisoOpenUsuariosModal
});

export const closeUsuariosModal = () => ({
	type: types.altaPermisoCloseUsuariosModal
});

export const startLoadUsuarios = (usuario, claveEntidad) => {
	return async (dispatch) => {
		const usuarios = await loadUsuarios(usuario, claveEntidad);
		dispatch(setUsuarios(usuarios));
	};
};

export const setUsuarios = (usuarios) => ({
	type: types.loadUsuarios,
	payload: usuarios
});

export const startSetUsuarioSelected = (usuario) => {
	return async (dispatch) => {
		const localidad = await loadLocalidad(usuario.ejido);
		const supPrevia = await loadSuperficiePrevia(
			`${usuario.cuenta}.${usuario.subcta}`,
			usuario.modulo
		);
		usuario.ejido = localidad;
		usuario.supPrevia = supPrevia;
		dispatch(setUsuarioSelected(usuario));
	};
};

export const setUsuarioSelected = (usuario) => {
	if (usuario.estado === 26) {
		usuario.estado = "Sonora";
	}
	if (usuario.estado === 2) {
		usuario.estado = "Baja California";
	}
	if (usuario.municipio === 2) {
		usuario.municipio = "Mexicali";
	}
	if (usuario.municipio === 55) {
		usuario.municipio = "San Luis Rio Colorado";
	}
	if (usuario.sistRiego === 1) {
		usuario.sistRiego = "Gravedad";
	}
	if (usuario.sistRiego === 2 && usuario.equipo === 1) {
		usuario.sistRiego = "Poso Particular";
	}
	if (usuario.sistRiego === 2 && usuario.equipo === 2) {
		usuario.sistRiego = "Poso Federal";
	}
	return {
		type: types.setUsuario,
		payload: usuario
	};
};

export const unsetUsuarioSelected = () => ({
	type: types.unsetUsuario
});
