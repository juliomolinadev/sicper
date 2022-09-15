import { types } from "../types/types";
import { loadUsuarios } from "../helpers/loadUsuarios";
import { loadSuperficiePrevia } from "../helpers/loadSuperficiePrevia";
import { loadUserTransfer } from "../helpers/DB/loadUserTransfer";
import { loadCiclo } from "../helpers/DB/loadCiclo";
import { startSetEstadoExpedicionModulo } from "./auth";
import { goToElement } from "../helpers/functions/assets";
import { unsetTransferencia } from "./transferenciasScreen";
import { loadLaboresPendientes } from "../helpers/loadLaboresPendientes";
import { loadDictamen } from "../helpers/loadDictamen";
import { loadCultivoAnterior } from "../helpers/loadCultivoAnterior";
import { setCultivoAnteriorSelected } from "./cultivos";

export const openUsuariosModal = () => ({
	type: types.altaPermisoOpenUsuariosModal
});

export const closeUsuariosModal = () => ({
	type: types.altaPermisoCloseUsuariosModal
});

export const startLoadUsuarios = (usuario, modulo, ciclo, global) => {
	return async (dispatch) => {
		const usuarios = await loadUsuarios(usuario, modulo, ciclo, global);
		dispatch(setUsuarios(usuarios));
		dispatch(startSetEstadoExpedicionModulo(modulo));
	};
};

export const setUsuarios = (usuarios) => ({
	type: types.setUsuarios,
	payload: usuarios
});
export const unsetUsuarios = () => ({
	type: types.unsetUsuarios
});

export const startSetUsuarioSelected = (usuario, tipo) => {
	unsetUsuarioSelected();

	return async (dispatch) => {
		const ciclo = await loadCiclo();

		const cultivoAnterior = await loadCultivoAnterior(
			`${usuario.cuenta}.${usuario.subcta}`,
			usuario.entidad,
			// TODO: Poner ciclo de forma dinamica
			"2021-2022"
		);

		console.log(cultivoAnterior);
		dispatch(setCultivoAnteriorSelected(cultivoAnterior));

		const laboresPendientes = await loadLaboresPendientes(
			`${usuario.cuenta}.${usuario.subcta}`,
			usuario.entidad,
			// TODO: Poner ciclo de forma dinamica
			"2021-2022"
		);

		const dictamen = await loadDictamen(
			`${usuario.cuenta}.${usuario.subcta}`,
			// TODO: Poner ciclo de forma dinamica
			"2022-2023"
		);

		// Verifica si los derechos corresponden a una transferencia
		if (usuario.folio) {
			const supPrevia = await loadSuperficiePrevia(
				`${usuario.cuenta}.${usuario.subcta}`,
				usuario.moduloDestino,
				ciclo,
				tipo,
				usuario.folio
			);

			usuario.supRiego = usuario.superficieTransferida;
			usuario.supPrevia = supPrevia;
			usuario.laboresPendientes = laboresPendientes;
			usuario.dictamen = dictamen;

			dispatch(unsetTransferencia());
			dispatch(setUsuarioSelected(usuario));
			goToElement("cultivoInput");
		} else {
			const supPrevia = await loadSuperficiePrevia(
				`${usuario.cuenta}.${usuario.subcta}`,
				usuario.entidad,
				ciclo,
				tipo
			);

			const transfers = await loadUserTransfer(`${usuario.cuenta}-${usuario.subcta}`, ciclo);

			usuario.laboresPendientes = laboresPendientes;
			usuario.supPrevia = supPrevia + transfers;
			usuario.dictamen = dictamen;

			dispatch(unsetTransferencia());
			dispatch(setUsuarioSelected(usuario));
			goToElement("cultivoInput");
		}
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

export const setUpdatingReacomodos = () => ({
	type: types.setUpdatingReacomodos
});

export const unsetUpdatingReacomodos = () => ({
	type: types.unsetUpdatingReacomodos
});

export const setDictamenData = (dictamen) => ({
	type: types.setDictamenData,
	payload: dictamen
});

export const setDictamenDataSaved = (dictamen) => ({
	type: types.setDictamenDataSaved,
	payload: dictamen
});
