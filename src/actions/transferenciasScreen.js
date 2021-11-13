import { types } from "../types/types";

export const setTransferencia = (transferencia) => {
	console.log("transferencia en action: ", transferencia);

	return { type: types.setTransferencia, payload: transferencia };
};

export const unsetTransferencia = () => ({
	type: types.unsetTransferencia
});

export const openTransferModal = () => ({
	type: types.openTransferModal
});

export const closeTransferModal = () => ({
	type: types.closeTransferModal
});
