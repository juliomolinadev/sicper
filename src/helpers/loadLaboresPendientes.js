import { db } from "../firebase/firebase-config";

export const loadLaboresPendientes = async (cuenta, modulo, ciclo) => {
	const permisos = [];
	let laboresPendientes = false;
	const permisosSnap = await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.where("cuenta", "==", cuenta)
		.where("estadoPermiso", "!=", "Cancelado")
		.get();

	permisosSnap.forEach((snapHijo) => {
		permisos.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	permisos.forEach((permiso) => {
		if (permiso.laboresPendientes === true) laboresPendientes = true;
	});

	return laboresPendientes;
};
