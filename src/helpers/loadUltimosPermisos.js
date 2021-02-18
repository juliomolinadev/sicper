import { db } from "../firebase/firebase-config";

export const loadUltimosPermisos = async (modulo, ciclo) => {
	const permisosSnap = await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.orderBy("fechaEmicion", "desc")
		.limit(20)
		.get();

	const permisos = [];

	permisosSnap.forEach((snapHijo) => {
		permisos.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	return permisos;
};
