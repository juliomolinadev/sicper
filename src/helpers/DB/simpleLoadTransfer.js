import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";
import { modulos } from "../consts";

export const simpleLoadTransfer = async (palabra = 0, campo, modulo, ciclo, global) => {
	const transferencias = [];
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

	if (transferencias.length === 0) {
		Swal.fire("No se encontraron transferencias ", "...", "warning");
	}
	return transferencias;
};
