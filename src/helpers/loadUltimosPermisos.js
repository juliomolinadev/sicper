import { db } from "../firebase/firebase-config";
import moment from "moment";

export const loadUltimosPermisos = async () => {
	const hoy = moment().toDate();
	const hoyMenos3 = moment().subtract(3, "days").toDate();

	console.log("Fechas: ", hoy, hoyMenos3);

	const permisosSnap = await db
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

	console.log("Permisos: ", permisos);

	return permisos;
};
