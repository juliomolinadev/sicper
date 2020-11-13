import { db } from "../firebase/firebase-config";

export const loadSuperficiePrevia = async (cuenta) => {
	const permisosSnap = await db.collection(`permisos`).where("cuenta", "==", cuenta).get();

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
