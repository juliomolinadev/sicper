import { db } from "../../firebase/firebase-config";
import "firebase/firestore";
import { entidades } from "../consts";
import Swal from "sweetalert2";

export const actualizarEntidades = async (data = entidades) => {
	const ref = db.collection("entidades");
	const promices = [];

	data.forEach((entidad) => {
		ref
			.doc(entidad.clave)
			.get()
			.then((doc) => {
				if (doc.exist) {
					promices.push(ref.doc(entidad.clave).update(entidad));
				} else {
					promices.push(ref.doc(entidad.clave).set(entidad));
				}
			})
			.catch((e) => {
				console.log(`Error al actualizar entidad (${entidad.clave})`, e);
			});
	});

	await Promise.all(promices).then(
		Swal.fire(
			"Cambios guardados",
			"Se actualizaron con éxito los datos de las entidades.",
			"success"
		)
	);
};
