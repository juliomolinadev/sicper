import { db } from "../../firebase/firebase-config";
import firebase from "firebase/app";
import Swal from "sweetalert2";

export const saveConcesionCultivo = async (concesion) => {
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

			if (concesionInDb.exists) {
				transaction.update(concesionModuloRef, {
					supConcesion: firebase.firestore.FieldValue.increment(
						concesion.supConcesion - concesionInDb.data().supConcesion
					)
				});

				transaction.update(concesionRef, { supConcesion: concesion.supConcesion });
			} else {
				transaction.update(concesionModuloRef, {
					supConcesion: firebase.firestore.FieldValue.increment(concesion.supConcesion)
				});

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
