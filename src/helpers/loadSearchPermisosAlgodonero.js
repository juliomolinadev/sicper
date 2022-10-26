import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const loadSearchPermisosAlgodonero = async (id, palabra, cicloConsulta) => {
	const cicloSplit = cicloConsulta.split("-");
	const cicloAnterior = `${Number(cicloSplit[0]) - 1}-${Number(cicloSplit[1]) - 1}`;

	const permisos = [];

	const permisosNombre = getNombreRef(id, palabra, cicloAnterior);

	await permisosNombre.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			permisos.push({
				id: doc.id,
				superficieMapeada: doc.data().superficie,
				...doc.data()
			});
		});
	});

	const permisosCuenta = getCuentaRef(id, palabra, cicloAnterior);

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

const getNombreRef = (id, palabra, ciclo) => {
	if (id === 0) {
		return db
			.collectionGroup("permisos")
			.where("ciclo", "==", ciclo)
			.where("claveCultivo", "==", 80)
			.orderBy("usuario")
			.startAt(palabra.toUpperCase())
			.endAt(palabra.toUpperCase() + "\uf8ff");
	} else {
		return db
			.collectionGroup("permisos")
			.where("tecnico", "==", id)
			.where("ciclo", "==", ciclo)
			.where("claveCultivo", "==", 80)
			.orderBy("usuario")
			.startAt(palabra.toUpperCase())
			.endAt(palabra.toUpperCase() + "\uf8ff");
	}
};

const getCuentaRef = (id, palabra, ciclo) => {
	if (id === 0) {
		return db
			.collectionGroup("permisos")
			.where("ciclo", "==", ciclo)
			.where("claveCultivo", "==", 80)
			.orderBy("cuenta")
			.startAt(palabra)
			.endAt(palabra + "\uf8ff");
	} else {
		return db
			.collectionGroup("permisos")
			.where("tecnico", "==", id)
			.where("ciclo", "==", ciclo)
			.where("claveCultivo", "==", 80)
			.orderBy("cuenta")
			.startAt(palabra)
			.endAt(palabra + "\uf8ff");
	}
};
