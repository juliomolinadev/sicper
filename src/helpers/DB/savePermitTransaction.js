import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";
import moment from "moment";
import firebase from "firebase/app";

export const savePermitTransaction = async (allData) => {
	const data = {
		idUsuarioSelected: allData.idUsuarioSelected,
		cuenta: allData.cuenta,
		usuario: allData.usuario,
		supDerecho: allData.supDerecho,
		lote: allData.lote,
		// TODO: Poner nombre de localidad antes de guardar
		localidad: allData.nombreLocalidad,
		nombreLocalidad: allData.nombreLocalidad,
		municipio: allData.municipio,
		estado: allData.estado,
		modulo: allData.modulo,
		zona: allData.zona,
		seccion: allData.seccion,
		canal: allData.canal,
		toma: allData.toma,
		sistema: allData.sistema,
		idProductorSelected: allData.idProductorSelected,
		nombreProductor: allData.nombreProductor,
		rfcProductor: allData.rfcProductor,
		curpProductor: allData.curpProductor ? allData.curpProductor : "",
		idCultivoSelected: allData.idCultivoSelected,
		nombreCultivo: allData.nombreCultivo,
		claveCultivo: allData.claveCultivo,
		subciclo: allData.subciclo,
		cuotaCultivo: allData.cuotaCultivo,
		supPrevia: allData.supPrevia,
		tipo: allData.tipo,
		ciclo: allData.ciclo,
		numeroPermiso: allData.numeroPermiso,
		fechaEmicion: moment(allData.fechaEmicion).toDate(),
		fechaLimite: moment(allData.fechaLimite).toDate(),
		vigencia: moment(allData.vigencia).toDate(),
		variedad: allData.variedad,
		supAutorizada: allData.supAutorizada,
		fuenteCredito: allData.fuenteCredito,
		latitud: allData.latitud,
		longitud: allData.longitud,
		cultivoAnterior: allData.cultivoAnterior,
		observaciones: allData.observaciones,
		uid: allData.uid,
		name: allData.name,
		dotacionGravedad: allData.dotacionGravedad,
		dotacionPozo: allData.dotacionPozo,
		titular: allData.titular,
		transferencia: allData.transferencia,
		estadoPermiso: allData.estadoPermiso,
		reacomodo: allData.reacomodo ? allData.reacomodo : "",
		direccion: allData.direccion
	};

	if (data.nombreCultivo === "ALGODONERO") {
		data.tecnico = "sinAsignar";
		data.desfoliado = false;
		data.cosechado = false;
		data.desvarado = false;
		data.disqueado = false;
		data.desarraigado = false;
		data.superficieMapeada = 0;
		data.pagado = false;
		data.constanciaFitosanitaria = false;
	}

	const permisosPorCultivoRef = db
		.collection(`permisos`)
		.doc(data.ciclo)
		.collection("modulos")
		.doc(`Modulo-${data.modulo}`)
		.collection(`permisosPorCultivo`)
		.doc(`${data.claveCultivo}-${data.nombreCultivo}`);

	const permisoRef = db
		.collection(`permisos`)
		.doc(data.ciclo)
		.collection("modulos")
		.doc(`Modulo-${data.modulo}`)
		.collection(`permisos`)
		.doc(data.numeroPermiso);

	const contadorPermisosRef = db
		.collection(`permisos`)
		.doc(data.ciclo)
		.collection("modulos")
		.doc(`Modulo-${data.modulo}`);

	try {
		const isSave = await db.runTransaction(async (transaction) => {
			const permiso = await transaction.get(permisoRef);
			const permisosPorCultivo = await transaction.get(permisosPorCultivoRef);

			if (permiso.exists) {
				Swal.fire(
					"El permiso ya existe",
					"Está intentando sobreescribir un permiso ya existente, verifique su conexión.",
					"error"
				);

				throw new Error("El permiso ya existe!");
			} else {
				transaction.set(permisoRef, data);
				transaction.update(contadorPermisosRef, {
					numeroPermisosModulo: firebase.firestore.FieldValue.increment(1),
					superficieModulo: firebase.firestore.FieldValue.increment(allData.supAutorizada)
				});

				if (permisosPorCultivo.exists) {
					switch (allData.sistema) {
						case "Gravedad":
							if (allData.tipo === "normal") {
								transaction.update(permisosPorCultivoRef, {
									numeroPermisos: firebase.firestore.FieldValue.increment(1),
									superficie: firebase.firestore.FieldValue.increment(allData.supAutorizada),
									gravedadNormal: firebase.firestore.FieldValue.increment(allData.supAutorizada)
								});
							}

							if (allData.tipo === "extra") {
								transaction.update(permisosPorCultivoRef, {
									numeroPermisos: firebase.firestore.FieldValue.increment(1),
									superficie: firebase.firestore.FieldValue.increment(allData.supAutorizada),
									gravedadExtra: firebase.firestore.FieldValue.increment(allData.supAutorizada)
								});
							}
							break;

						case "Pozo Federal":
							if (allData.tipo === "normal") {
								transaction.update(permisosPorCultivoRef, {
									numeroPermisos: firebase.firestore.FieldValue.increment(1),
									superficie: firebase.firestore.FieldValue.increment(allData.supAutorizada),
									pozoNormal: firebase.firestore.FieldValue.increment(allData.supAutorizada)
								});
							}

							if (allData.tipo === "extra") {
								transaction.update(permisosPorCultivoRef, {
									numeroPermisos: firebase.firestore.FieldValue.increment(1),
									superficie: firebase.firestore.FieldValue.increment(allData.supAutorizada),
									pozoExtra: firebase.firestore.FieldValue.increment(allData.supAutorizada)
								});
							}
							break;

						case "Pozo Particular":
							if (allData.tipo === "normal") {
								transaction.update(permisosPorCultivoRef, {
									numeroPermisos: firebase.firestore.FieldValue.increment(1),
									superficie: firebase.firestore.FieldValue.increment(allData.supAutorizada),
									pozoParticularNormal: firebase.firestore.FieldValue.increment(
										allData.supAutorizada
									)
								});
							}

							if (allData.tipo === "extra") {
								transaction.update(permisosPorCultivoRef, {
									numeroPermisos: firebase.firestore.FieldValue.increment(1),
									superficie: firebase.firestore.FieldValue.increment(allData.supAutorizada),
									pozoParticularExtra: firebase.firestore.FieldValue.increment(
										allData.supAutorizada
									)
								});
							}
							break;

						default:
							console.log("Sistema de riego indefinido");
							break;
					}
				} else {
					switch (allData.sistema) {
						case "Gravedad":
							if (allData.tipo === "normal") {
								transaction.set(permisosPorCultivoRef, {
									subciclo: data.subciclo,
									estado: data.estado,
									modulo: data.modulo,
									clave: allData.claveCultivo,
									cultivo: allData.nombreCultivo,
									numeroPermisos: firebase.firestore.FieldValue.increment(1),
									superficie: firebase.firestore.FieldValue.increment(allData.supAutorizada),
									gravedadNormal: firebase.firestore.FieldValue.increment(allData.supAutorizada)
								});
							}

							if (allData.tipo === "extra") {
								transaction.set(permisosPorCultivoRef, {
									subciclo: data.subciclo,
									estado: data.estado,
									modulo: data.modulo,
									clave: allData.claveCultivo,
									cultivo: allData.nombreCultivo,
									numeroPermisos: firebase.firestore.FieldValue.increment(1),
									superficie: firebase.firestore.FieldValue.increment(allData.supAutorizada),
									gravedadExtra: firebase.firestore.FieldValue.increment(allData.supAutorizada)
								});
							}
							break;

						case "Pozo Federal":
							if (allData.tipo === "normal") {
								transaction.set(permisosPorCultivoRef, {
									subciclo: data.subciclo,
									estado: data.estado,
									modulo: data.modulo,
									clave: allData.claveCultivo,
									cultivo: allData.nombreCultivo,
									numeroPermisos: firebase.firestore.FieldValue.increment(1),
									superficie: firebase.firestore.FieldValue.increment(allData.supAutorizada),
									pozoNormal: firebase.firestore.FieldValue.increment(allData.supAutorizada)
								});
							}

							if (allData.tipo === "extra") {
								transaction.set(permisosPorCultivoRef, {
									subciclo: data.subciclo,
									estado: data.estado,
									modulo: data.modulo,
									clave: allData.claveCultivo,
									cultivo: allData.nombreCultivo,
									numeroPermisos: firebase.firestore.FieldValue.increment(1),
									superficie: firebase.firestore.FieldValue.increment(allData.supAutorizada),
									pozoExtra: firebase.firestore.FieldValue.increment(allData.supAutorizada)
								});
							}
							break;

						case "Pozo Particular":
							if (allData.tipo === "normal") {
								transaction.set(permisosPorCultivoRef, {
									subciclo: data.subciclo,
									estado: data.estado,
									modulo: data.modulo,
									clave: allData.claveCultivo,
									cultivo: allData.nombreCultivo,
									numeroPermisos: firebase.firestore.FieldValue.increment(1),
									superficie: firebase.firestore.FieldValue.increment(allData.supAutorizada),
									pozoParticularNormal: firebase.firestore.FieldValue.increment(
										allData.supAutorizada
									)
								});
							}

							if (allData.tipo === "extra") {
								transaction.set(permisosPorCultivoRef, {
									subciclo: data.subciclo,
									estado: data.estado,
									modulo: data.modulo,
									clave: allData.claveCultivo,
									cultivo: allData.nombreCultivo,
									numeroPermisos: firebase.firestore.FieldValue.increment(1),
									superficie: firebase.firestore.FieldValue.increment(allData.supAutorizada),
									pozoParticularExtra: firebase.firestore.FieldValue.increment(
										allData.supAutorizada
									)
								});
							}
							break;

						default:
							console.log("Sistema de riego indefinido");
							break;
					}
				}
				return true;
			}
		});

		if (isSave) {
			Swal.fire("Permiso Guardado", "Se registró con éxito el nuevo permiso de riego.", "success");
		}

		return isSave;
	} catch (error) {
		console.error(error);
		throw error;
	}

	// const sfDocRef = doc(db, "cities", "SF");

	// try {
	// 	const newPopulation = await runTransaction(db, async (transaction) => {
	// 		const sfDoc = await transaction.get(sfDocRef);
	// 		if (!sfDoc.exists()) {
	// 			throw "Document does not exist!";
	// 		}

	// 		const newPop = sfDoc.data().population + 1;
	// 		if (newPop <= 1000000) {
	// 			transaction.update(sfDocRef, { population: newPop });
	// 			return newPop;
	// 		} else {
	// 			return Promise.reject("Sorry! Population is too big");
	// 		}
	// 	});

	// 	console.log("Population increased to ", newPopulation);
	// } catch (e) {
	// 	// This will be a "population is too big" error.
	// 	console.error(e);
	// }
};
