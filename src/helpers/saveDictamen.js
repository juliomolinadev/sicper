import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const saveDictamen = async (cuenta, ciclo, newDictamen) => {
	const dictamenRef = db.collection(`dictamenes`).doc(ciclo).collection("dictamenes").doc(cuenta);

	try {
		const isSave = await db.runTransaction(async (transaction) => {
			const dictamenFile = await transaction.get(dictamenRef);

			if (dictamenFile.exists) {
				Swal.fire(
					"El dictamen ya existe",
					"Está intentando sobreescribir un dictamen ya existente, verifique su conexión.",
					"error"
				);

				throw new Error("El dictamen ya existe");
			} else {
				transaction.set(dictamenRef, newDictamen);
			}

			return true;
		});

		if (isSave) {
			Swal.fire("Dictamen Guardado", "Se registró con éxito el dictamen.", "success");

			return true;
		}
	} catch (error) {
		Swal.fire("Error de conexión", "Error al intentar guardar dictamen.", "error");
		console.error(error);
		return false;
	}
};
