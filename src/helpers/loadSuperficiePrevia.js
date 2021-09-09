import { db } from "../firebase/firebase-config";

export const loadSuperficiePrevia = async (cuenta, modulo, ciclo) => {
	const permisosSnap = await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.where("cuenta", "==", cuenta)
		.where("estadoPermiso", "!=", "Cancelado")
		.get();

	const permisos = [];

	permisosSnap.forEach((snapHijo) => {
		permisos.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	let supPrevia = 0;

	permisos.forEach((permiso) => {
		supPrevia += permiso.supAutorizada;
	});

	return supPrevia;
};
