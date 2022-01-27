import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const getConstanciaSanidadCount = async (ciclo) => {
	const counter = await db
		.collection(`constanciasSanidad`)
		.doc(ciclo)
		.get()
		.then((doc) => {
			if (doc.exists) {
				const contador = doc.data().numeroConstancia;
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
