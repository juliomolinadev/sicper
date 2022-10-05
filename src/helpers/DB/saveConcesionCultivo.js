import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const saveConcesionCultivo = async (concesion) => {
	const newConcesion = { ...concesion };
	delete newConcesion.id;

	try {
		await db
			.collection("padronesCultivos")
			.doc(concesion.ciclo)
			.collection("padrones")
			.doc(concesion.cultivo)
			.collection("padron")
			.doc(`${concesion.idProductor}-${concesion.cultivo}-${concesion.modulo}`)
			.set(newConcesion);

		Swal.fire("Cambios guardados.", "Los datos se actualizaron correctamente.", "success");

		return true;
	} catch (error) {
		console.log(error);
		Swal.fire("Error de conexión", "Error al intentar guardar los cambios.", "error");

		return false;
	}
};
