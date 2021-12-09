import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const getConstancyCounter = async (anio) => {
	const counter = await db
		.collection(`constancias`)
		.doc(`${anio}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				const contador = doc.data().contadorConstancias;
				return contador;
			} else {
				return 0;
			}
		})
		.catch((e) => {
			console.log(" Error: ", e);
			Swal.fire(
				"Error de conexión",
				"Error al intentar obtener el contador de constancias.",
				"error"
			);
			return false;
		});

	return counter;
};
