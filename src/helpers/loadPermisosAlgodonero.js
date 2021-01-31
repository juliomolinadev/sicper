import { db } from "../firebase/firebase-config";

export const loadPermisosAlgodonero = async () => {
	const permisos = [];

	const permisosSnap = db.collectionGroup("permisos").where("nombreCultivo", "==", "ALGODONERO");

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
