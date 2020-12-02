import { db } from "../firebase/firebase-config";
import moment from "moment";

export const loadUltimosPermisos = async () => {
	const hoy = moment().toDate();
	const hoyMenos3 = moment().subtract(3, "days").toDate();

	const permisosSnap = await db
		.collection(`permisos`)
		.where("fechaEmicion", "<=", hoy)
		.where("fechaEmicion", ">=", hoyMenos3)
		.orderBy("fechaEmicion")
		.get();

	const permisos = [];
	const permisosFormateados = [];

	permisosSnap.forEach((snapHijo) => {
		permisos.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	permisos.forEach((permiso) => {
		permisosFormateados.push({
			...permiso,
			fechaEmicion: moment(permiso.fechaEmicion.toDate()).format("DD/MM/YYYY"),
			fechaLimite: moment(permiso.fechaLimite.toDate()).format("DD/MM/YYYY"),
			vigencia: moment(permiso.vigencia.toDate()).format("DD/MM/YYYY")
		});
	});

	return permisosFormateados;
};
