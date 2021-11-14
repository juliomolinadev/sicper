import { db } from "../../firebase/firebase-config";

export const loadTransferencias = async (ciclo, modulo) => {
	const transferenciasSnap = await db
		.collection(`transferencias`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`transferencias`)
		.get();

	const transferencias = [];

	transferenciasSnap.forEach((snapHijo) => {
		transferencias.push({
			...snapHijo.data(),
			id: snapHijo.id
		});
	});

	return transferencias;
};
