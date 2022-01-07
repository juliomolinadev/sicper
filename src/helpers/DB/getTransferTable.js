import { db } from "../../firebase/firebase-config";
import { transferModulos } from "../consts";

export const getTransferTable = async (ciclo) => {
	const transferencias = [];
	const table = [];
	const modulos = [];
	transferModulos.forEach((modulo) => modulos.push(modulo));
	const size = modulos.length;

	for (let i = 0; i < size; i++) {
		const row = [];
		for (let j = 0; j < size; j++) {
			row.push(0);
		}
		table.push(row);
	}

	const transferSnap = await db.collectionGroup("transferencias").where("ciclo", "==", ciclo).get();

	transferSnap.forEach((snap) => {
		if (snap.data().moduloDestino !== "dev")
			transferencias.push({
				origen: `${snap.data().modulo}`,
				destino: snap.data().moduloDestino,
				ha: snap.data().superficieTransferida
			});
	});

	for (let i = 0; i < size; i++) {
		for (let j = 0; j < size; j++) {
			const transfersXY = transferencias.filter(
				(transfer) => transfer.origen === modulos[i] && transfer.destino === modulos[j]
			);

			if (transfersXY.length > 0) transfersXY.forEach((transfer) => (table[i][j] += transfer.ha));
		}
	}

	for (let i = 0; i < size; i++) {
		let totalRow = 0;
		for (let j = 0; j < size; j++) {
			totalRow += table[i][j];
		}
		table[i].push(totalRow);
	}

	const totals = ["Total Destino"];
	for (let i = 0; i <= size; i++) {
		let totalCol = 0;
		for (let j = 0; j < size; j++) {
			totalCol += table[j][i];
		}
		totals.push(totalCol);
	}

	modulos.unshift("x");
	table.unshift(modulos);
	modulos.forEach((modulo, i) => {
		if (i !== 0) table[i].unshift([modulo]);
	});
	modulos.push("Total Origen");
	table.push(totals);

	return table;
};
