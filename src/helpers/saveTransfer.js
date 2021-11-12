import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";
import firebase from "firebase/app";

export const saveTransfer = async (transfer, ciclo) => {
	const transferRef = db
		.collection(`transferencias`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${transfer.moduloDestino}`)
		.collection(`transferencias`)
		.doc(transfer.folio);

	const contTransferRef = db
		.collection(`transferencias`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${transfer.moduloDestino}`);

	try {
		const isSave = await db.runTransaction(async (transaction) => {
			const transferencia = await transaction.get(transferRef);
			const countTransfer = await transaction.get(contTransferRef);

			if (transferencia.exists) {
				Swal.fire(
					"La transferencia ya existe",
					"Está intentando sobreescribir una transferencia ya existente, verifique su conexión.",
					"error"
				);

				throw new Error("La transferencia ya existe");
			} else {
				transaction.set(transferRef, transfer);
				if (countTransfer.exists) {
					transaction.update(contTransferRef, {
						numeroTransferenciasModulo: firebase.firestore.FieldValue.increment(1),
						superficieRecibidaModulo: firebase.firestore.FieldValue.increment(
							transfer.superficieTransferida
						)
					});
				} else {
					transaction.set(contTransferRef, {
						numeroTransferenciasModulo: 1,
						superficieRecibidaModulo: transfer.superficieTransferida
					});
				}
			}

			return true;
		});

		if (isSave) {
			Swal.fire(
				"Transferencia Guardada",
				"Se registró con éxito la transferncia de volumen.",
				"success"
			);
		}
	} catch (error) {
		Swal.fire("Error de conexión", "Error al intntar guardar transferencia.", "error");
		console.error(error);
		return false;
	}
};
