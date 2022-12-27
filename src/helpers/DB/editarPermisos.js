import { db } from "../../firebase/firebase-config";
import { exportJSONToExcel } from "../functions/exportJSONToExcel";

// Descarga expedicion de trigo ######################################################################
export const editarPermisos = async () => {
	const concesiones = [];

	const headers = {
		header: [
			"ID_CONCESION",
			"ID_PRODUCTOR",
			"CURP",
			"NOMBRE",
			"CULTIVO",
			"MODULO",
			"CICLO",
			"SUP_CONCESION",
			"SUP_EXPEDIDA"
		]
	};

	///padronesCultivos/2022-2023/padrones/ALFALFA/padron/ FICJ700625HBCRXR03-ALFALFA-8
	const concesionesBatch = await db
		.collection("padronesCultivos")
		.doc("2022-2023")
		.collection("padrones")
		.doc("ALFALFA NUEVA")
		.collection("padron")
		.get();

	concesionesBatch.forEach((concesion) => {
		concesiones.push({
			ID_CONCESION: concesion.id,
			CICLO: concesion.data().ciclo,
			CULTIVO: concesion.data().cultivo,
			CURP: concesion.data().curp,
			ID_PRODUCTOR: concesion.data().idProductor,
			MODULO: concesion.data().modulo,
			NOMBRE: concesion.data().nombre,
			SUP_CONCESION: concesion.data().supConcesion,
			SUP_EXPEDIDA: concesion.data().supExpedida
		});
	});

	exportJSONToExcel(
		concesiones,
		headers,
		"PadronAlfalfaNueva",
		"JulioMolina",
		"PadronAlfalfaNueva"
	);

	// console.table(concesiones);
};

// Descarga expedicion de trigo ######################################################################
// export const editarPermisos = async () => {
// 	const permisos = [];

// 	const headers = {
// 		header: [
// 			"CICLO",
// 			"CLAVE_CULTIVO",
// 			"CLAVECULTIVO_ANTERIOR",
// 			"CLAVE_LOCALIDAD",
// 			"CUENTA",
// 			"CULTIVO_ANTERIOR",
// 			"CURP_PRODUCTOR",
// 			"ESTADO",
// 			"ESTADO_PERMISO",
// 			"FECHA_EMICION",
// 			"FECHA_LIMITE",
// 			"FUENTE_CREDITO",
// 			"LOCALIDAD",
// 			"LOTE",
// 			"MODULO",
// 			"MUNICIPIO",
// 			"NOMBRE_CULTIVO",
// 			"NOMBRE_LOCALIDAD",
// 			"NOMBRE_PRODUCTOR",
// 			"NUMERO_PERMISO",
// 			"OBSERVACIONES",
// 			"REACOMODO",
// 			"RFC_PRODUCTOR",
// 			"SECCION",
// 			"SISTEMA",
// 			"SUBCICLO",
// 			"SUP_AUTORIZADA",
// 			"SUP_DERECHO",
// 			"TIPO_PERMISO",
// 			"TIPO_LOCALIDAD",
// 			"TIPO_SEMILLA",
// 			"TRANSFERENCIA",
// 			"USUARIO",
// 			"VARIEDAD"
// 		]
// 	};

// 	const permisosBatch = await db
// 		.collectionGroup("permisos")
// 		.where("claveCultivo", "==", 3)
// 		.where("ciclo", "==", "2022-2023")
// 		.where("estadoPermiso", "!=", "Cancelado")
// 		.get();

// 	permisosBatch.forEach((permiso) => {
// 		permisos.push({
// 			CICLO: permiso.data().ciclo,
// 			CLAVE_CULTIVO: permiso.data().claveCultivo,
// 			CLAVECULTIVO_ANTERIOR: permiso.data().claveCultivoAnterior,
// 			CLAVE_LOCALIDAD: permiso.data().claveLocalidad,
// 			CUENTA: permiso.data().cuenta,
// 			CULTIVO_ANTERIOR: permiso.data().cultivoAnterior,
// 			CURP_PRODUCTOR: permiso.data().curpProductor,
// 			ESTADO: permiso.data().estado,
// 			ESTADO_PERMISO: permiso.data().estadoPermiso,
// 			FECHA_EMICION: permiso.data().fechaEmicion.toDate().toLocaleDateString(),
// 			FECHA_LIMITE: permiso.data().fechaLimite.toDate().toLocaleDateString(),
// 			FUENTE_CREDITO: permiso.data().fuenteCredito,
// 			LOCALIDAD: permiso.data().localidad,
// 			LOTE: permiso.data().lote,
// 			MODULO: permiso.data().modulo,
// 			MUNICIPIO: permiso.data().municipio,
// 			NOMBRE_CULTIVO: permiso.data().nombreCultivo,
// 			NOMBRE_LOCALIDAD: permiso.data().nombreLocalidad,
// 			NOMBRE_PRODUCTOR: permiso.data().nombreProductor,
// 			NUMERO_PERMISO: permiso.data().numeroPermiso,
// 			OBSERVACIONES: permiso.data().observaciones,
// 			REACOMODO: permiso.data().reacomodo,
// 			RFC_PRODUCTOR: permiso.data().rfcProductor,
// 			SECCION: permiso.data().seccion,
// 			SISTEMA: permiso.data().sistema,
// 			SUBCICLO: permiso.data().subciclo,
// 			SUP_AUTORIZADA: permiso.data().supAutorizada,
// 			SUP_DERECHO: permiso.data().supDerecho,
// 			TIPO_PERMISO: permiso.data().tipo,
// 			TIPO_LOCALIDAD: permiso.data().tipoLocalidad,
// 			TIPO_SEMILLA: permiso.data().tipoSemilla,
// 			TRANSFERENCIA: permiso.data().transferencia,
// 			USUARIO: permiso.data().usuario,
// 			VARIEDAD: permiso.data().variedad
// 		});
// 	});

// 	exportJSONToExcel(permisos, headers, "PermisosTrigoDic23", "JulioMolina", "PermisosTrigoDic23");

// 	// console.table(permisos);
// };

// Muestra permisoa cancelados por modulo ######################################################################
// export const editarPermisos = async () => {
// 	const permisos = [];
// 	const usuarios = [];

// 	const usuariosBatch = await db.collection("usuarios").get();

// 	usuariosBatch.forEach((usuario) => {
// 		usuarios.push({
// 			id: usuario.id,
// 			displayName: usuario.data().displayName,
// 			email: usuario.data().email
// 		});
// 	});

// 	const permisosBatch = await db
// 		.collection("permisos")
// 		.doc("2021-2022")
// 		.collection("modulos")
// 		.doc(`Modulo-14`)
// 		.collection("permisos")
// 		.where("estadoPermiso", "!=", "activo")
// 		.get();

// 	permisosBatch.forEach((permiso) => {
// 		const usuario = usuarios.find(
// 			(usuario) => usuario.id === permiso.data().solicitanteCancelacion
// 		);
// 		permisos.push({
// 			numeroPermiso: permiso.data().numeroPermiso,
// 			ciclo: permiso.data().ciclo,
// 			estadoPermiso: permiso.data().estadoPermiso,
// 			cuenta: permiso.data().cuenta,
// 			usuario: permiso.data().usuario,
// 			nombreCultivo: permiso.data().nombreCultivo,
// 			supAutorizada: permiso.data().supAutorizada,
// 			usuarioSolicitante: usuario.displayName,
// 			emailSolicitante: usuario.email,
// 			fechaSolicitudCancelacion: permiso
// 				.data()
// 				.fechaSolicitudCancelacion.toDate()
// 				.toLocaleDateString()
// 		});
// 	});

// 	console.table(permisos);
// };

// // Muestra los permisos expedidos que evadieron labores fitosanitarias ###########################################
// export const editarPermisos = async () => {
// 	const permisosAnterioresSnap = await db
// 		.collectionGroup("permisos")
// 		.where("claveCultivo", "==", 80)
// 		.where("ciclo", "==", "2021-2022")
// 		.where("estadoPermiso", "!=", "Cancelado")
// 		.get();

// 	const permisosAnteriores = [];
// 	const permisosNuevosPromises = [];

// 	permisosAnterioresSnap.forEach((permiso) => {
// 		permisosAnteriores.push({ ...permiso.data() });

// 		const permisosNuevosRef = db
// 			.collection("permisos")
// 			.doc("2022-2023")
// 			.collection("modulos")
// 			.doc(`Modulo-${permiso.data().modulo}`)
// 			.collection("permisos")
// 			.where("cuenta", "==", permiso.data().cuenta);

// 		permisosNuevosPromises.push(permisosNuevosRef.get());
// 	});

// 	const permisosNuevosResolbed = await Promise.all(permisosNuevosPromises);
// 	const permisosFujitivos = [];

// 	permisosNuevosResolbed.forEach((batch) => {
// 		batch.forEach((permisoNuevo) => {
// 			const arrayDePermisosAnteriores = permisosAnteriores.filter(
// 				(permisoAnterior) => permisoAnterior.cuenta === permisoNuevo.data().cuenta
// 			);

// 			let stringDePermisosAnteriores = "";

// 			arrayDePermisosAnteriores.forEach((permiso) => {
// 				stringDePermisosAnteriores = `${stringDePermisosAnteriores}${permiso.numeroPermiso}*(${permiso.supAutorizada}ha) `;
// 			});

// 			permisosFujitivos.push({
// 				id: permisoNuevo.id,
// 				cultivo: permisoNuevo.data().nombreCultivo,
// 				modulo: permisoNuevo.data().modulo,
// 				cuenta: permisoNuevo.data().cuenta,
// 				expedida: permisoNuevo.data().supAutorizada,
// 				derecho: permisoNuevo.data().supDerecho,
// 				permisosAnteriores: stringDePermisosAnteriores
// 			});
// 		});
// 	});

// 	console.table(permisosFujitivos);
// };

// // Registra permisos ###########################################################################################
// export const editarPermisos = async () => {
// 	const permisos = [
// 		{
// 			numeroPermiso: "MOD9B-2000",
// 			cuenta: "10497.0",
// 			usuario: "ESTRADA GARCIA ERENDIDA Y+",
// 			modulo: "9B",
// 			claveLocalidad: 71,
// 			tipoLocalidad: "Colonia",
// 			nombreLocalidad: "MADERO",
// 			lote: "31",
// 			supAutorizada: 20
// 		},
// 		{
// 			numeroPermiso: "MOD11-2000",
// 			cuenta: "12455.0",
// 			usuario: "LOPEZ ANGULO ROSA",
// 			modulo: "11",
// 			claveLocalidad: 104,
// 			tipoLocalidad: "Colonia",
// 			nombreLocalidad: "SONORA",
// 			lote: "21",
// 			supAutorizada: 11.19
// 		},
// 		{
// 			numeroPermiso: "MOD11-2001",
// 			cuenta: "12767.0",
// 			usuario: "PALMERIN MEDRANO RAMON Y+",
// 			modulo: "11",
// 			claveLocalidad: 110,
// 			tipoLocalidad: "Colonia",
// 			nombreLocalidad: "V. CARRANZA",
// 			lote: "47",
// 			supAutorizada: 20
// 		},
// 		{
// 			numeroPermiso: "MOD17-2000",
// 			cuenta: "14635.0",
// 			usuario: "DE LA CERDA PIZANO LUIS",
// 			modulo: "17",
// 			claveLocalidad: 166,
// 			tipoLocalidad: "Ejido",
// 			nombreLocalidad: "HIDALGO",
// 			lote: "8",
// 			supAutorizada: 16.92
// 		},
// 		{
// 			numeroPermiso: "MOD21-2000",
// 			cuenta: "8436.0",
// 			usuario: "JIMENEZ BARRERA GABRIEL",
// 			modulo: "21",
// 			claveLocalidad: 211,
// 			tipoLocalidad: "Ejido",
// 			nombreLocalidad: "SOMBRERETE I",
// 			lote: "93",
// 			supAutorizada: 6.59
// 		}
// 	];

// 	try {
// 		permisos.forEach((permiso) => {
// 			console.log("Escribiendo: ", permiso.numeroPermiso);

// 			db.collection("permisos")
// 				.doc("2020-2021")
// 				.collection("modulos")
// 				.doc(`Modulo-${permiso.modulo}`)
// 				.collection("permisos")
// 				.doc(permiso.numeroPermiso)
// 				.set({
// 					...permiso,
// 					ciclo: "2020-2021",
// 					nombreCultivo: "ALGODONERO",
// 					estadoPermiso: "activo",
// 					claveCultivo: 80,
// 					barbechado: false,
// 					cosechado: false,
// 					desarraigado: false,
// 					desfoliado: false,
// 					desvarado: false,
// 					disqueado: false,
// 					laboresPendientes: true,
// 					pagado: false,
// 					superficieMapeada: 0,
// 					tecnico: false
// 				});
// 		});
// 	} catch (error) {
// 		console.log(error);
// 	}
// };

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
