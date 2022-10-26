import { db } from "../firebase/firebase-config";

export const loadLocaltiesFromPermits = async (cicloActual) => {
	const cicloSplit = cicloActual.split("-");
	const cicloAnterior = `${Number(cicloSplit[0]) - 1}-${Number(cicloSplit[1]) - 1}`;

	const permisosSnap = db
		.collectionGroup("permisos")
		.where("ciclo", "==", cicloAnterior)
		.where("claveCultivo", "==", 80);
	const localtiesIds = [];
	const localties = [];
	const padronLocalties = [];
	const padronLocaltiesSnap = await db.collectionGroup("colonias").get();

	padronLocaltiesSnap.forEach((localtie) => {
		padronLocalties.push({ id: localtie.id, ...localtie.data() });
	});

	await permisosSnap.get().then((permisos) => {
		permisos.forEach((permiso) => {
			if (permiso.data().claveLocalidad && !localtiesIds.includes(permiso.data().claveLocalidad)) {
				localtiesIds.push(permiso.data().claveLocalidad);
				localties.push({
					id: getLocaltieId(permiso.data().claveLocalidad, padronLocalties),
					clave: permiso.data().claveLocalidad,
					ubicacion: permiso.data().localidad,
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

const getLocaltieId = (clave, localties) => {
	const localtie = localties.find((localtie) => localtie.clave === clave);

	return localtie.id;
};
