import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const loadSearchPermisosAlgodonero = async (id, palabra) => {
	const permisos = [];

	const permisosNombre = getNombreRef(id, palabra);

	await permisosNombre.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			permisos.push({
				id: doc.id,
				superficieMapeada: doc.data().superficie,
				...doc.data()
			});
		});
	});

	const permisosCuenta = getCuentaRef(id, palabra);

	await permisosCuenta.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			permisos.push({
				id: doc.id,
				superficieMapeada: doc.data().superficie,
				...doc.data()
			});
		});
	});

	if (permisos.length === 0) {
		Swal.fire(
			"No se encontraron registros!",
			"Por favor intente con otro parámetro de búsqueda.",
			"error"
		);
	}

	return permisos;
};

const getNombreRef = (id, palabra) => {
	if (id === 0) {
		return db
			.collectionGroup("permisos")
			.where("ciclo", "==", "2020-2021")
			.orderBy("nombre")
			.startAt(palabra.toUpperCase())
			.endAt(palabra.toUpperCase() + "\uf8ff");
	} else {
		return db
			.collectionGroup("permisos")
			.where("tecnico", "==", id)
			.where("ciclo", "==", "2020-2021")
			.orderBy("nombre")
			.startAt(palabra.toUpperCase())
			.endAt(palabra.toUpperCase() + "\uf8ff");
	}
};

const getCuentaRef = (id, palabra) => {
	if (id === 0) {
		return db
			.collectionGroup("permisos")
			.where("ciclo", "==", "2020-2021")
			.orderBy("cuenta")
			.startAt(palabra)
			.endAt(palabra + "\uf8ff");
	} else {
		return db
			.collectionGroup("permisos")
			.where("tecnico", "==", id)
			.where("ciclo", "==", "2020-2021")
			.orderBy("cuenta")
			.startAt(palabra)
			.endAt(palabra + "\uf8ff");
	}
};
