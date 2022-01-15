import { db } from "../firebase/firebase-config";

export const loadSuperficiePrevia = async (cuenta, modulo, ciclo, folio = false) => {
	const permisos = [];
	let supPrevia = 0;
	const permisosPad = db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.where("cuenta", "==", cuenta)
		.where("estadoPermiso", "!=", "Cancelado");

	if (folio) {
		const permisosSnap = await permisosPad.where("idUsuarioSelected", "==", folio).get();

		permisosSnap.forEach((snapHijo) => {
			permisos.push({
				id: snapHijo.id,
				...snapHijo.data()
			});
		});
	} else {
		const permisosSnap = await permisosPad.get();

		permisosSnap.forEach((snapHijo) => {
			permisos.push({
				id: snapHijo.id,
				...snapHijo.data()
			});
		});
	}

	permisos.forEach((permiso) => {
		supPrevia += permiso.supAutorizada;
	});

	return supPrevia;
};
