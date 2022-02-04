import { db } from "../firebase/firebase-config";

export const printDuplicatePermits = async () => {
	console.log("Cargando permisos...");
	const unicos = [];
	const duplicados = [];
	const duplicadosCompletos = [];

	const permisosSnap = await db.collectionGroup("permisos").where("ciclo", "==", "2020-2021").get();

	permisosSnap.forEach((permisoSnap) => {
		const repetido = unicos.find(
			(unico) => unico.cuenta === permisoSnap.data().cuenta /* &&
				unico.superficie === permisoSnap.data().superficie &&
				unico.lote === permisoSnap.data().lote &&
				unico.nombre === permisoSnap.data().nombre &&
				unico.ubicacion === permisoSnap.data().ubicacion */
		);
		if (repetido) {
			if (!duplicados.includes(permisoSnap.data().cuenta)) {
				duplicados.push(repetido.cuenta);
				duplicadosCompletos.push(permisoSnap.data());
			}
		} else unicos.push(permisoSnap.data());
	});

	console.log(duplicados);
	console.table(duplicadosCompletos);

	duplicados.forEach(async (duplicado, i) => {
		const grupoSnap = await db
			.collectionGroup("permisos")
			.where("ciclo", "==", "2020-2021")
			.where("cuenta", "==", duplicado)
			.get();
		await console.log(`${i} Cargando grupo...`, duplicado);

		grupoSnap.forEach((permiso) => {
			console.log(permiso.id, permiso.data().cuenta, " :", Object.keys(permiso.data()).length);
		});
	});
};
