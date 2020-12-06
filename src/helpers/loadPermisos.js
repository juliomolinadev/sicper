import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const loadPermisos = async (palabra, modulo) => {
	const permisosNombre = await db
		.collection(`permisos`)
		.doc(`permisosM${modulo}`)
		.collection(`permisos`)
		.orderBy("usuario")
		.startAt(palabra.toUpperCase())
		.endAt(palabra.toUpperCase() + "\uf8ff")
		.get();

	const permisosCuenta = await db
		.collection(`permisos`)
		.doc(`permisosM${modulo}`)
		.collection(`permisos`)
		.orderBy("cuenta")
		.startAt(palabra)
		.endAt(palabra + "\uf8ff")
		.get();

	const permisosPermiso = await db
		.collection(`permisos`)
		.doc(`permisosM${modulo}`)
		.collection(`permisos`)
		.orderBy("numeroPermiso")
		.startAt(palabra.toUpperCase())
		.endAt(palabra.toUpperCase() + "\uf8ff")
		.get();

	const permisos = [];

	permisosNombre.forEach((snapHijo) => {
		permisos.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	permisosCuenta.forEach((snapHijo) => {
		permisos.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	permisosPermiso.forEach((snapHijo) => {
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

	console.log("Permisos: ", permisos);
	return permisos;
};
