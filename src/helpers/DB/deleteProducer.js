import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const deleteProducer = async (id) => {
	const producerRef = db.collection("productores").doc(id);

	try {
		const isDeleted = await db.runTransaction(async (transaction) => {
			const producer = await transaction.get(producerRef);

			if (producer.exists) {
				const permisosRef = await getPermitsRefs(id);
				if (permisosRef.length > 0) {
					Swal.fire(
						"El productor tiene permisos registrados.",
						"No es posible borrar el registro de un productor si se generaron permisos a su nombre.",
						"error"
					);
					return false;
				} else {
					transaction.delete(producerRef);
					return true;
				}
			} else {
				Swal.fire("El productor no existe", "...", "error");
				throw new Error("El productor no existe");
			}
		});

		if (isDeleted) {
			Swal.fire(
				"Productor eliminado. ",
				"Se eliminó con éxito el registro del productor.",
				"success"
			);

			return true;
		}
	} catch (error) {
		Swal.fire("Error de conexión", "Error al intntar borrar productor.", "error");
		console.error(error);
		return false;
	}
};

const getPermitsRefs = async (idProductor) => {
	const permisosRefs = [];

	const permisosSnap = db
		.collectionGroup("permisos")
		.where("idProductorSelected", "==", idProductor);

	await permisosSnap.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			permisosRefs.push(doc.ref);
		});
	});

	return permisosRefs;
};
