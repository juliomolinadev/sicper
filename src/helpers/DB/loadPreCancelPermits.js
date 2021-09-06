import { db } from "../../firebase/firebase-config";

export const loadPreCancelPermits = async (ciclo) => {
	const permisos = [];

	const permisosSnap = db
		.collectionGroup("permisos")
		.where("estadoPermiso", "==", "En proceso de cancelación")
		.where("ciclo", "==", ciclo);

	await permisosSnap.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			permisos.push({
				id: doc.id,
				...doc.data()
			});
		});
	});

	console.log("Entro en load", { permisos });
	return permisos;
};
