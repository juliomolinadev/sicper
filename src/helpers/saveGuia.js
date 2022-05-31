import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";
import firebase from "firebase/app";

export const saveGuia = async (ciclo, guia) => {
	console.log({ ciclo, guia });
	const guiaRef = db.collection(`guias`).doc(ciclo).collection("guias").doc(guia.folio);
	const contGuiaRef = db
		.collection(`guias`)
		.doc(ciclo)
		.collection("contadores")
		.doc(`Modulo-${guia.modulo}`);

	try {
		const isSave = await db.runTransaction(async (transaction) => {
			const guiaInDb = await transaction.get(guiaRef);
			const countGuia = await transaction.get(contGuiaRef);

			if (guiaInDb.exists) {
				Swal.fire(
					"La guia ya existe",
					"Está intentando sobreescribir una guia ya existente, verifique su conexión.",
					"error"
				);

				throw new Error("La guia ya existe");
			} else {
				transaction.set(guiaRef, { ...guia, guardado: true });
				if (countGuia.exists) {
					transaction.update(contGuiaRef, {
						numeroGuiasModulo: firebase.firestore.FieldValue.increment(1)
					});
				} else {
					transaction.set(contGuiaRef, {
						numeroGuiasModulo: 1
					});
				}
			}

			return true;
		});

		if (isSave) {
			Swal.fire("Guia Guardada", "Se registró con éxito la Guia.", "success");

			return true;
		}
	} catch (error) {
		Swal.fire("Error de conexión", "Error al intentar guardar guia.", "error");
		console.error(error);
		return false;
	}
};
