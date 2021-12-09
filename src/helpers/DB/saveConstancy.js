import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";
import firebase from "firebase/app";

export const saveConstancy = async (constancia, anio) => {
	const constancyRef = db
		.collection(`constancias`)
		.doc(`${anio}`)
		.collection("constancias")
		.doc(constancia.folio);

	const constancyCounterRef = db.collection(`constancias`).doc(`${anio}`);

	try {
		const isSave = await db.runTransaction(async (transaction) => {
			const constancy = await transaction.get(constancyRef);
			const constancyCounter = await transaction.get(constancyCounterRef);

			if (constancy.exists) {
				Swal.fire(
					"La transferencia ya existe",
					"Está intentando sobreescribir una transferencia ya existente, verifique su conexión.",
					"error"
				);

				throw new Error("La transferencia ya existe");
			} else {
				transaction.set(constancyRef, constancia);
				if (constancyCounter.exists) {
					transaction.update(constancyCounterRef, {
						contadorConstancias: firebase.firestore.FieldValue.increment(1)
					});
				} else {
					transaction.set(constancyCounterRef, {
						contadorConstancias: 1
					});
				}
			}

			return true;
		});

		if (isSave) {
			Swal.fire(
				"Constancia Guardada",
				"Se registró con éxito la constancia de derechos.",
				"success"
			);

			return true;
		}
	} catch (error) {
		Swal.fire("Error de conexión", "Error al intntar guardar constancia.", "error");
		console.error(error);
		return false;
	}
};
