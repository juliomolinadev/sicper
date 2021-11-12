import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const getTranseferCount = async (modulo, ciclo) => {
	const counter = await db
		.collection(`transferencias`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				const contador = doc.data().numeroTransferenciasModulo;
				return contador;
			} else {
				return 0;
			}
		})
		.catch((e) => {
			console.log(" Error: ", e);
			Swal.fire(
				"Error de conexión",
				"Error al intentar obtener el contador de transferencias.",
				"error"
			);
			return false;
		});

	return counter;
};
