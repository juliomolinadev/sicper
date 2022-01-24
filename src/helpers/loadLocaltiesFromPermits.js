import { db } from "../firebase/firebase-config";

export const loadLocaltiesFromPermits = async () => {
	const permisosSnap = db.collectionGroup("permisos").where("ciclo", "==", "2020-2021");
	const localtiesIds = [];
	const localties = [];
	const padronLocalties = [];
	const padronLocaltiesSnap = await db.collectionGroup("colonias").get();

	padronLocaltiesSnap.forEach((localtie) => {
		padronLocalties.push({ ...localtie.data() });
	});

	await permisosSnap.get().then((permisos) => {
		permisos.forEach((permiso) => {
			if (permiso.data().claveLocalidad && !localtiesIds.includes(permiso.data().claveLocalidad)) {
				localtiesIds.push(permiso.data().claveLocalidad);
				localties.push({
					clave: permiso.data().claveLocalidad,
					ubicacion: permiso.data().ubicacion,
					tipo: permiso.data().tipoLocalidad,
					tecnico: getTechnician(permiso.data().claveLocalidad, padronLocalties)
				});
			}
		});
	});

	return localties;
};

const getTechnician = (id, localties) => {
	const localtie = localties.find((localtie) => localtie.clave === id);

	if (localtie.tecnico) return localtie.tecnico;
	else return "Sin asignar";
};
