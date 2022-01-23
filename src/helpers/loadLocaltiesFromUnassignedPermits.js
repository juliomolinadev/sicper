import { db } from "../firebase/firebase-config";

export const loadLocaltiesFromUnassignedPermits = async () => {
	const permisosSnap = db.collectionGroup("permisos").where("ciclo", "==", "2020-2021");
	const localtiesIds = [];
	const localties = [];

	await permisosSnap.get().then((permisos) => {
		permisos.forEach((permiso) => {
			if (permiso.data().claveLocalidad && !localtiesIds.includes(permiso.data().claveLocalidad)) {
				localtiesIds.push(permiso.data().claveLocalidad);
				localties.push({
					clave: permiso.data().claveLocalidad,
					ubicacion: permiso.data().ubicacion,
					tipo: permiso.data().tipoLocalidad
				});
			}
		});
	});

	return localties;
};
