import { loadTransferencias } from "../helpers/DB/loadTransferencias";
import { types } from "../types/types";

export const setNuevaTransferencia = (transferencia) => ({
	type: types.setNuevaTransferencia,
	payload: transferencia
});

export const unsetNuevaTransferencia = () => ({
	type: types.unsetNuevaTransferencia
});

export const setTransferencia = (transferencia) => ({
	type: types.setTransferencia,
	payload: transferencia
});

export const unsetTransferencia = () => ({
	type: types.unsetTransferencia
});

export const setTransferencias = (transferencias) => ({
	type: types.setTransferencias,
	payload: transferencias
});

export const unsetTransferencias = () => ({
	type: types.unsetTransferencias
});

export const startSetTransferencias = (ciclo, modulo) => {
	return async (dispatch) => {
		const transferencias = await loadTransferencias(ciclo, modulo);
		dispatch(setTransferencias(transferencias));
	};
};

export const openTransferModal = () => ({
	type: types.openTransferModal
});

export const closeTransferModal = () => ({
	type: types.closeTransferModal
});

export const enablePrintButton = () => ({
	type: types.enablePrintButton
});

export const disablePrintButton = () => ({
	type: types.disablePrintButton
});
