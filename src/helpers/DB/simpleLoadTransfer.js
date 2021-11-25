import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";
import { modulos } from "../consts";

export const simpleLoadTransfer = async (pairs, modulo, ciclo, global) => {
	const { palabra = 0, campo } = pairs[0];
	const transferencias = [];
	const transferenciasFiltradas = [];
	const qrysTransferencias = [];

	const transferRef = db
		.collection(`transferencias`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`transferencias`);

	if (global) {
		modulos.forEach((modulo) => {
			const transferRef = db
				.collection(`transferencias`)
				.doc(ciclo)
				.collection("modulos")
				.doc(`Modulo-${modulo}`)
				.collection(`transferencias`);

			if (palabra.length === 0) qrysTransferencias.push(transferRef.orderBy(campo).get());
			else {
				qrysTransferencias.push(
					transferRef
						.orderBy(campo)
						.startAt(palabra.toUpperCase())
						.endAt(palabra.toUpperCase() + "\uf8ff")
						.get()
				);

				qrysTransferencias.push(
					transferRef
						.orderBy(campo)
						.startAt(palabra)
						.endAt(palabra + "\uf8ff")
						.get()
				);

				qrysTransferencias.push(transferRef.where(campo, "==", Number(palabra)).get());
			}
		});
	} else {
		if (palabra.length === 0) qrysTransferencias.push(transferRef.orderBy(campo).get());
		else {
			qrysTransferencias.push(
				transferRef
					.orderBy(campo)
					.startAt(palabra.toUpperCase())
					.endAt(palabra.toUpperCase() + "\uf8ff")
					.get()
			);

			qrysTransferencias.push(
				transferRef
					.orderBy(campo)
					.startAt(palabra)
					.endAt(palabra + "\uf8ff")
					.get()
			);

			qrysTransferencias.push(transferRef.where(campo, "==", Number(palabra)).get());
		}
	}

	const resolvedTransferQrys = await Promise.all(qrysTransferencias);

	resolvedTransferQrys.forEach((snap) => {
		snap.forEach((snapHijo) => {
			transferencias.push({
				...snapHijo.data()
			});
		});
	});

	transferenciasFiltradas.push(transferencias);

	if (pairs.length > 1) {
		for (let i = 1; i <= pairs.length - 1; i++) {
			const transferencias = transferenciasFiltradas.pop();
			transferenciasFiltradas.push(
				transferencias.filter(
					(transferencia) =>
						transferencia[pairs[i].campo] === ifIsNumber(pairs[i].campo, pairs[i].palabra)
				)
			);
		}
	}

	if (transferencias.length === 0) {
		Swal.fire("No se encontraron transferencias ", "...", "warning");
	}
	return onlyUnique(transferenciasFiltradas.pop(), "folio");
};

const ifIsNumber = (campo, value) => {
	switch (campo) {
		case "seccion":
		case "claveCultivo":
			return parseInt(value);

		case "modulo":
			if (value === "9A" || value === "9B") return value;
			else return parseInt(value);

		default:
			return value;
	}
};

const onlyUnique = (objectsArray, key) => {
	const unique = [];
	const clearArray = [];
	objectsArray.forEach((element) => {
		const index = unique.indexOf(element[key]);
		if (index === -1) {
			unique.push(element[key]);
			clearArray.push(element);
		}
	});

	return clearArray;
};
