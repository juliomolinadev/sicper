import { db } from "../firebase/firebase-config";

export const loadSearchPermisosAlgodonero = async (palabra) => {
	const permisos = [];

	const permisosNombre = db
		.collectionGroup("permisos")
		.where("nombreCultivo", "==", "ALGODONERO")
		.orderBy("usuario")
		.startAt(palabra.toUpperCase())
		.endAt(palabra.toUpperCase() + "\uf8ff");

	await permisosNombre.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			permisos.push({
				id: doc.id,
				...doc.data()
			});
		});
	});

	const permisosCuenta = db
		.collectionGroup("permisos")
		.where("nombreCultivo", "==", "ALGODONERO")
		.orderBy("cuenta")
		.startAt(palabra.toUpperCase())
		.endAt(palabra.toUpperCase() + "\uf8ff");

	await permisosCuenta.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			permisos.push({
				id: doc.id,
				...doc.data()
			});
		});
	});

	const permisosPermiso = db
		.collectionGroup("permisos")
		.where("nombreCultivo", "==", "ALGODONERO")
		.orderBy("numeroPermiso")
		.startAt(palabra.toUpperCase())
		.endAt(palabra.toUpperCase() + "\uf8ff");

	await permisosPermiso.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			permisos.push({
				id: doc.id,
				...doc.data()
			});
		});
	});

	return permisos;
};
