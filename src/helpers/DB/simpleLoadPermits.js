import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const simpleLoadPermits = async (palabra, campo, modulo, ciclo) => {
	const permisos = [];
	const qrysPermisos = [];
	const permisosRef = db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`);

	qrysPermisos.push(
		permisosRef
			.orderBy(campo)
			.startAt(palabra.toUpperCase())
			.endAt(palabra.toUpperCase() + "\uf8ff")
			.get()
	);

	qrysPermisos.push(permisosRef.where(campo, "==", Number(palabra)).get());

	const resolvedPermisosQrys = await Promise.all(qrysPermisos);

	resolvedPermisosQrys.forEach((snap) => {
		snap.forEach((snapHijo) => {
			permisos.push({
				id: snapHijo.id,
				...snapHijo.data()
			});
		});
	});

	if (permisos.length === 0) {
		Swal.fire("No se encontraron permisos ", "...", "warning");
	}
	return permisos;
};
