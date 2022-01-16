import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const saveTechnicianModules = async (id, modulos) => {
	const technicianRef = db.collection("usuarios").doc(id);

	try {
		const isSave = await db.runTransaction(async (transaction) => {
			transaction.update(technicianRef, { modulos });

			return true;
		});

		if (isSave) {
			Swal.fire(
				"Cambios guardados",
				"Se aplicaron los cambios en la asignación de predios.",
				"success"
			);

			return true;
		}
	} catch (error) {
		Swal.fire("Error de conexión", "Error al intentar guardar los cambios.", "error");
		console.error(error);
		return false;
	}
};
