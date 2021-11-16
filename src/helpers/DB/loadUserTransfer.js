import { modulos } from "../consts";
import { db } from "../../firebase/firebase-config";

const loadTransfer = (modulo, ciclo) => {
	return db
		.collection(`transferencias`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`transferencias`)
		.get();
};

export const loadUserTransfer = async (id, ciclo) => {
	const transferencias = [];
	let superficie = 0;

	const transferPromises = modulos.map((modulo) => {
		if (modulo !== "dev") {
			return loadTransfer(modulo, ciclo);
		} else return loadTransfer(99, ciclo);
	});

	const data = await Promise.all(transferPromises);

	data.forEach((item) => {
		item.forEach((childItem) => {
			const transferId = `${childItem.data().cuenta}-${childItem.data().subcta}`;
			const estado = childItem.data().estadoTransferencia;
			if (id === transferId && estado !== "CANCELADA") {
				transferencias.push(childItem.data().superficieTransferida);
			}
		});
	});

	if (transferencias.length > 0) {
		transferencias.forEach((transferencia) => (superficie += transferencia));
	}

	return superficie;
};
