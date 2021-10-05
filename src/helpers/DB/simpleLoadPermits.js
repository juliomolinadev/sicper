import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const simpleLoadPermits = async (palabra, campo, modulo, ciclo) => {
	const permisosSnap = await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.orderBy(campo)
		.startAt(palabra.toUpperCase())
		.endAt(palabra.toUpperCase() + "\uf8ff")
		.get();

	const permisos = [];

	permisosSnap.forEach((snapHijo) => {
		permisos.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	if (permisos.length === 0) {
		Swal.fire(
			"No se encontraron permisos ",
			"Se mostrarán los últimos permisos registrados.",
			"warning"
		);
	}
	return permisos;
};
