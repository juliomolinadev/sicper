import { db } from "../../firebase/firebase-config";
import "firebase/firestore";
import { entidades } from "../consts";

export const actualizarEntidades = (data = entidades) => {
	console.log(data);
	const ref = db.collection("entidades");

	data.forEach((entidad) => {
		ref
			.doc(entidad.clave)
			.get()
			.then((doc) => {
				if (doc.exist) {
					ref.doc(entidad.clave).update(entidad);
					console.log(`Se actualizo entidad (${entidad.clave})`);
				} else {
					ref.doc(entidad.clave).set(entidad);
					console.log(`Se agrogo entidad (${entidad.clave})`);
				}
			})
			.catch((e) => {
				console.log(`Error al actualizar entidad (${entidad.clave})`, e);
			});
	});
};
