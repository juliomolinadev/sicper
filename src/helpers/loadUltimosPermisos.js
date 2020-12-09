import { db } from "../firebase/firebase-config";
import moment from "moment";

export const loadUltimosPermisos = async (modulo) => {
	const hoy = moment().toDate();
	const hoyMenos3 = moment().subtract(15, "days").toDate();

	const permisosSnap = await db
		.collection(`permisos`)
		.doc(`permisosM${modulo}`)
		.collection(`permisos`)
		.where("fechaEmicion", "<=", hoy)
		.where("fechaEmicion", ">=", hoyMenos3)
		.orderBy("fechaEmicion")
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
