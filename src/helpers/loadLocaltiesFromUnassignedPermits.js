import { db } from "../firebase/firebase-config";

export const loadLocaltiesFromUnassignedPermits = async () => {
	const permisosSnap = db.collectionGroup("permisos").where("tecnico", "==", "sinAsignar");
	const localties = [];

	await permisosSnap.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			if (!localties.includes(doc.data().localidad)) {
				localties.push(doc.data().localidad);
			}
		});
	});

	return localties;
};
