import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const loadPermitsForPay = async () => {
	const permisos = [];

	const desarraigadoSnap = await db
		.collectionGroup("permisos")
		.where("ciclo", "==", "2020-2021")
		.where("desarraigado", "==", true)
		.get();

	const barbechadoSnap = await db
		.collectionGroup("permisos")
		.where("ciclo", "==", "2020-2021")
		.where("barbechado", "==", true)
		.get();

	desarraigadoSnap.forEach((doc) => {
		if (doc.data().pagado !== true) {
			permisos.push({
				id: doc.id,
				superficieMapeada: doc.data().superficie,
				...doc.data()
			});
		}
	});

	barbechadoSnap.forEach((doc) => {
		if (doc.data().pagado !== true) {
			permisos.push({
				id: doc.id,
				superficieMapeada: doc.data().superficie,
				...doc.data()
			});
		}
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
