import { types } from "../types/types";
import { loadUsuarios } from "../helpers/loadUsuarios";
import { loadLocalidad } from "../helpers/loadLocalidad";
import { loadSuperficiePrevia } from "../helpers/loadSuperficiePrevia";
import { loadUserTransfer } from "../helpers/loadUserTransfer";

export const openUsuariosModal = () => ({
	type: types.altaPermisoOpenUsuariosModal
});

export const closeUsuariosModal = () => ({
	type: types.altaPermisoCloseUsuariosModal
});

export const startLoadUsuarios = (usuario, modulo) => {
	return async (dispatch) => {
		const usuarios = await loadUsuarios(usuario, modulo);
		dispatch(setUsuarios(usuarios));
	};
};

export const setUsuarios = (usuarios) => ({
	type: types.setUsuarios,
	payload: usuarios
});

export const startSetUsuarioSelected = (usuario) => {
	unsetUsuarioSelected();

	// TODO: crear funcion para definir ciclo
	const ciclo = "2020-2021";

	return async (dispatch) => {
		const localidad = await loadLocalidad(usuario.ejido);
		const supPrevia = await loadSuperficiePrevia(
			`${usuario.cuenta}.${usuario.subcta}`,
			usuario.modulo,
			ciclo
		);
		const transfers = await loadUserTransfer(
			`${usuario.cuenta}.${usuario.subcta}`,
			usuario.modulo,
			ciclo
		);

		usuario.localidad = localidad;
		usuario.supPrevia = supPrevia + transfers;
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
		usuario.sistRiego = "Pozo Particular";
	}
	if (usuario.sistRiego === 2 && usuario.equipo === 2) {
		usuario.sistRiego = "Pozo Federal";
	}
	return {
		type: types.setUsuario,
		payload: usuario
	};
};

export const unsetUsuarioSelected = () => ({
	type: types.unsetUsuario
});

export const setUpdatingPadron = () => ({
	type: types.setUpdatingPadron
});

export const unsetUpdatingPadron = () => ({
	type: types.unsetUpdatingPadron
});
