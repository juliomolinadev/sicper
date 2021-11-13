import { types } from "../types/types";

export const setTransferencia = (transferencia) => ({
	type: types.setTransferencia,
	payload: transferencia
});

export const unsetTransferencia = () => ({
	type: types.unsetTransferencia
});

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
