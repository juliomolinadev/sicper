import { db } from "../../firebase/firebase-config";
import { transferModulos as modulos } from "../consts";

export const getTransferTable = async (ciclo) => {
	const transferencias = [];
	const table = [];

	const transferSnap = await db.collectionGroup("transferencias").where("ciclo", "==", ciclo).get();

	transferSnap.forEach((snap) => {
		if (snap.data().moduloDestino !== "dev")
			transferencias.push({
				origen: `${snap.data().modulo}`,
				destino: snap.data().moduloDestino,
				ha: snap.data().superficieTransferida
			});
	});

	// console.log(transferencias);

	table.push(modulos);
	modulos.forEach((modulo) => table.push([modulo]));

	for (let i = 1; i <= modulos.length; i++) {
		for (let j = 1; j <= modulos.length; j++) {
			if (table[i][j] === undefined) table[i][j] = 0;
			const transfersXY = transferencias.filter(
				(transfer) => transfer.origen === modulos[i] && transfer.destino === modulos[j]
			);

			if (transfersXY.length > 0) console.log(transfersXY);

			if (transfersXY.length > 0) transfersXY.forEach((transfer) => (table[i][j] += transfer.ha));
		}
	}

	for (let i = 1; i <= modulos.length; i++) {
		let totalRow = 0;
		for (let j = 1; j <= modulos.length; j++) {
			totalRow += table[i][j];
		}
		table[i].push(totalRow);
	}

	const totals = ["Total Destino"];
	for (let i = 1; i <= modulos.length + 1; i++) {
		let totalCol = 0;
		for (let j = 1; j <= modulos.length; j++) {
			totalCol += table[j][i];
		}
		totals.push(totalCol);
	}

	table[0].unshift("x");
	table[0].push("Total Origen");
	table.push(totals);
	return table;
};
