import { db } from "../../firebase/firebase-config";

// Muestra los permisos expedidos que evadieron labores fitosanitarias ###########################################
export const editarPermisos = async () => {
	const permisosAnterioresSnap = await db
		.collectionGroup("permisos")
		.where("claveCultivo", "==", 80)
		.where("ciclo", "==", "2021-2022")
		.where("estadoPermiso", "!=", "Cancelado")
		.get();

	const permisosAnteriores = [];
	const permisosNuevosPromises = [];

	permisosAnterioresSnap.forEach((permiso) => {
		permisosAnteriores.push({ ...permiso.data() });

		const permisosNuevosRef = db
			.collection("permisos")
			.doc("2022-2023")
			.collection("modulos")
			.doc(`Modulo-${permiso.data().modulo}`)
			.collection("permisos")
			.where("cuenta", "==", permiso.data().cuenta);

		permisosNuevosPromises.push(permisosNuevosRef.get());
	});

	const permisosNuevosResolbed = await Promise.all(permisosNuevosPromises);
	const permisosFujitivos = [];

	permisosNuevosResolbed.forEach((batch) => {
		batch.forEach((permisoNuevo) => {
			const arrayDePermisosAnteriores = permisosAnteriores.filter(
				(permisoAnterior) => permisoAnterior.cuenta === permisoNuevo.data().cuenta
			);

			let stringDePermisosAnteriores = "";

			arrayDePermisosAnteriores.forEach((permiso) => {
				stringDePermisosAnteriores = `${stringDePermisosAnteriores}${permiso.numeroPermiso}*(${permiso.supAutorizada}ha) `;
			});

			permisosFujitivos.push({
				id: permisoNuevo.id,
				cultivo: permisoNuevo.data().nombreCultivo,
				modulo: permisoNuevo.data().modulo,
				cuenta: permisoNuevo.data().cuenta,
				expedida: permisoNuevo.data().supAutorizada,
				derecho: permisoNuevo.data().supDerecho,
				permisosAnteriores: stringDePermisosAnteriores
			});
		});
	});

	console.table(permisosFujitivos);
};

// // Asigna tecnico a permisos del 2021-2022 ##################################################################
// export const editarPermisos = async () => {
// 	const permisosSnap = await db
// 		.collectionGroup("permisos")
// 		.where("claveCultivo", "==", 80)
// 		.where("ciclo", "==", "2021-2022")
// 		.get();

// 	const tecnicosSnap = await db.collection("usuarios").where("rol", "==", "tecnicoCESVBC").get();

// 	const tecnicos = [];
// 	tecnicosSnap.forEach((tecnico) => {
// 		tecnicos.push({
// 			id: tecnico.id,
// 			localidades: tecnico.data().localidades
// 		});
// 	});

// 	let batch = db.batch();
// 	let i = 1;
// 	const batchSize = 500;

// 	permisosSnap.forEach((permiso) => {
// 		const tecnico = tecnicos.find((tecnico) =>
// 			tecnico.localidades.includes(permiso.data().claveLocalidad)
// 		);
// 		// console.log(permiso.id);
// 		// console.log(permiso.data().claveLocalidad);
// 		// else console.log("sintecnico");
// 		// if (tecnico) {
// 		// 	console.log(tecnico.id);
// 		// 	console.log(permiso.data().claveLocalidad);
// 		// 	console.log(permiso.id);
// 		// }

// 		const ref = db
// 			.collection("permisos")
// 			.doc("2021-2022")
// 			.collection("modulos")
// 			.doc(`Modulo-${permiso.data().modulo}`)
// 			.collection("permisos")
// 			.doc(permiso.id);

// 		batch.update(ref, {
// 			laboresPendientes: true,
// 			tecnico: tecnico ? tecnico.id : false
// 		});

// 		if (i === batchSize) {
// 			batch
// 				.commit()
// 				.then(() => {
// 					console.log("Se termino de subir batch");
// 				})
// 				.catch((err) => {
// 					console.error(err);
// 				});
// 			batch = db.batch();
// 			i = 0;
// 		}

// 		i++;
// 	});

// 	batch
// 		.commit()
// 		.then(() => {
// 			console.log("Se terminaron de editar los permisos");
// 		})
// 		.catch((err) => {
// 			console.error(err);
// 			console.log("Ya termino");
// 		});
// };

// // Homologa permisos de algodon del 2020-2021 con 2021-2022 ###########################################################
// export const editarPermisos = async () => {
// 	const permisosSnap = await db
// 		.collectionGroup("permisos")
// 		.where("cultivo", "==", "ALGODONERO")
// 		.where("ciclo", "==", "2020-2021")
// 		.get();

// 	let batch = db.batch();
// 	let i = 1;
// 	const batchSize = 500;

// 	// const permisos = [];
// 	permisosSnap.forEach((permiso) => {
// 		// console.log(permiso.data().claveLocalidad);
// 		// else console.log("sintecnico");
// 		// if (tecnico) {
// 		// 	console.log(tecnico.id);
// 		// 	console.log(permiso.data().claveLocalidad);
// 		// 	console.log(permiso.id);
// 		// }

// 		// permisos.push({
// 		// 	nombreCultivo: "ALGODONERO",
// 		// 	claveCultivo: 80,
// 		// 	numeroPermiso: permiso.data().folio,
// 		// 	estadoPermiso: "activo",
// 		// 	usuario: permiso.data().nombre,
// 		// 	supAutorizada: permiso.data().superficie,
// 		// 	nombreLocalidad: permiso.data().ubicacion
// 		// });

// 		const ref = db
// 			.collection("permisos")
// 			.doc("2020-2021")
// 			.collection("modulos")
// 			.doc(`Modulo-${permiso.data().modulo}`)
// 			.collection("permisos")
// 			.doc(permiso.id);

// 		batch.update(ref, {
// 			nombreCultivo: "ALGODONERO",
// 			claveCultivo: 80,
// 			numeroPermiso: permiso.data().folio,
// 			estadoPermiso: "activo",
// 			usuario: permiso.data().nombre,
// 			supAutorizada: permiso.data().superficie,
// 			nombreLocalidad: permiso.data().ubicacion
// 		});

// 		if (i === batchSize) {
// 			batch
// 				.commit()
// 				.then(() => {
// 					console.log("Se termino de subir batch");
// 				})
// 				.catch((err) => {
// 					console.error(err);
// 				});
// 			batch = db.batch();
// 			i = 0;
// 		}

// 		i++;
// 	});

// 	batch
// 		.commit()
// 		.then(() => {
// 			console.log("Se terminaron de editar los permisos");
// 		})
// 		.catch((err) => {
// 			console.error(err);
// 			console.log("Ya termino");
// 		});

// 	// console.log(permisos);
// };
