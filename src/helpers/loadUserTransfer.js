import { db } from "../firebase/firebase-config";

export const loadUserTransfer = async (cuenta, modulo, ciclo) => {
	const transferSnap = await db
		.collection(`transferencias`)
		.doc(ciclo)
		.collection("transferencias")
		.where("cuentaOrigen", "==", cuenta)
		.where("moduloOrigen", "==", modulo)
		.get();

	const transfer = [];

	transferSnap.forEach((snapHijo) => {
		transfer.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	let supPrevia = 0;

	transfer.forEach((transfer) => {
		supPrevia += transfer.superficieTransferida;
	});

	return supPrevia;
};
