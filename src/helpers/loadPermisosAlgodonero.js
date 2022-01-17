import { db } from "../firebase/firebase-config";

export const loadPermisosAlgodonero = async (id) => {
	const permisos = [];

	const permisosSnap = db
		.collectionGroup("permisos")
		.where("tecnico", "==", id)
		.where("ciclo", "==", "2020-2021");

	await permisosSnap.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			permisos.push({
				id: doc.id,
				...doc.data()
			});
		});
	});

	return permisos;
};
