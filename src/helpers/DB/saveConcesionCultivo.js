import { db } from "../../firebase/firebase-config";
import firebase from "firebase/app";
import Swal from "sweetalert2";

export const saveConcesionCultivo = async (concesion) => {
	console.log(concesion);

	const newConcesion = { ...concesion };
	delete newConcesion.id;

	const concesionRef = db
		.collection("padronesCultivos")
		.doc(concesion.ciclo)
		.collection("padrones")
		.doc(concesion.cultivo)
		.collection("padron")
		.doc(`${concesion.idProductor}-${concesion.cultivo}-${concesion.modulo}`);

	const concesionModuloRef = db
		.collection("padronesCultivos")
		.doc(concesion.ciclo)
		.collection("padrones")
		.doc(concesion.cultivo)
		.collection("modulos")
		.doc(`${concesion.cultivo}-${concesion.modulo}`);

	try {
		const isSave = await db.runTransaction(async (transaction) => {
			const concesionInDb = await transaction.get(concesionRef);
			const concesionModuloInDb = await transaction.get(concesionModuloRef);

			if (concesionInDb.exists) {
				transaction.update(concesionModuloRef, {
					supConcesion: firebase.firestore.FieldValue.increment(
						concesion.supConcesion - concesionInDb.data().supConcesion
					)
				});

				transaction.update(concesionRef, { supConcesion: concesion.supConcesion });
			} else {
				if (concesionModuloInDb.exists) {
					transaction.update(concesionModuloRef, {
						supConcesion: firebase.firestore.FieldValue.increment(concesion.supConcesion)
					});
				} else {
					transaction.set(concesionModuloRef, {
						cultivo: concesion.cultivo,
						modulo: concesion.modulo,
						ciclo: concesion.ciclo,
						supConcesion: concesion.supConcesion,
						supExpedida: 0
					});
				}

				transaction.set(concesionRef, newConcesion);
			}

			return true;
		});

		if (isSave) {
			Swal.fire("Cambios guardados.", "Los datos se actualizaron correctamente.", "success");
		}

		return true;
	} catch (error) {
		console.log(error);
		Swal.fire("Error de conexión", "Error al intentar guardar los cambios.", "error");

		return false;
	}
};
