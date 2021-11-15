import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const updateTransfer = async (transferencia, estado) => {
	const transferRef = db
		.collection(`transferencias`)
		.doc(transferencia.ciclo)
		.collection("modulos")
		.doc(`Modulo-${transferencia.moduloDestino}`)
		.collection(`transferencias`)
		.doc(transferencia.folio);

	try {
		const isSave = await db.runTransaction(async (transaction) => {
			transaction.update(transferRef, { estadoTransferencia: estado });
			return true;
		});

		if (isSave) {
			const transfer = await transferRef.get();
			Swal.fire(
				`Transferencia ${estado}`,
				"Se actualizó con éxito el estado de la transferencia.",
				"success"
			);

			return transfer.data();
		}
	} catch (error) {
		Swal.fire("Error de conexión", "Error al intntar actualizar transferencia.", "error");
		console.error(error);
		return false;
	}
};
