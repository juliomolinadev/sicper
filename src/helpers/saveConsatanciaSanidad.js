import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";
import firebase from "firebase/app";

export const saveConstanciaSanidad = async (constacia, ciclo) => {
	console.log({ constacia, ciclo });

	const constanciaRef = db
		.collection(`constanciasSanidad`)
		.doc(ciclo)
		.collection(`constancias`)
		.doc(constacia.numeroPermiso);

	const contConstanciaRef = db.collection(`constanciasSanidad`).doc(ciclo);

	try {
		const isSave = await db.runTransaction(async (transaction) => {
			const constancia = await transaction.get(constanciaRef);
			const countConstancia = await transaction.get(contConstanciaRef);

			if (constancia.exists) {
				Swal.fire(
					"La constancia ya existe",
					"Está intentando sobreescribir una constancia ya existente, verifique su conexión.",
					"error"
				);

				throw new Error("La constancia ya existe");
			} else {
				transaction.set(constanciaRef, constacia);
				if (countConstancia.exists) {
					transaction.update(contConstanciaRef, {
						numeroConstancia: firebase.firestore.FieldValue.increment(1)
					});
				} else {
					transaction.set(contConstanciaRef, {
						numeroConstancia: 1
					});
				}
			}

			return true;
		});

		if (isSave) {
			Swal.fire("Constancia Guardada", "Se registró con éxito la constancia.", "success");

			return true;
		}
	} catch (error) {
		Swal.fire("Error de conexión", "Error al intentar guardar la constancia.", "error");
		console.error(error);
		return false;
	}
};
