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
		localidad: allData.nombreLocalidad,
		nombreLocalidad: allData.nombreLocalidad,
		tipoLocalidad: allData.tipoLocalidad,
		claveLocalidad: allData.claveLocalidad,
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
		idCultivoAnteriorSelected: allData.idCultivoAnteriorSelected,
		claveCultivoAnterior: allData.claveCultivoAnterior,
		observaciones: allData.observaciones,
		uid: allData.uid,
		name: allData.name,
		dotacionGravedad: allData.dotacionGravedad,
		dotacionPozo: allData.dotacionPozo,
		titular: allData.titular,
		transferencia: allData.transferencia,
		estadoPermiso: allData.estadoPermiso,
		reacomodo: allData.reacomodo ? allData.reacomodo : "",
		direccion: allData.direccion,
		tipoSemilla: allData.tipoSemilla ? allData.tipoSemilla : "",
		requiereDictamen: allData.requiereDictamen ?? false,
		requiereComplementoVolumen: allData.requiereComplementoVolumen ?? false,
		requiereControlCPUS: allData.requiereControlCPUS ?? false,
		permisosVinculados: allData.permisosComplemento.map((permiso) => permiso.id)
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

	const concesionRef = db
		.collection("padronesCultivos")
		.doc(data.ciclo)
		.collection("padrones")
		.doc(data.nombreCultivo)
		.collection("padron")
		.doc(`${data.idProductorSelected}-${data.nombreCultivo}-${data.modulo}`);

	const concesionModuloRef = db
		.collection("padronesCultivos")
		.doc(data.ciclo)
		.collection("padrones")
		.doc(data.nombreCultivo)
		.collection("modulos")
		.doc(`${data.nombreCultivo}-${data.modulo}`);

	try {
		const isSave = await db.runTransaction(async (transaction) => {
			const permiso = await transaction.get(permisoRef);
			const permisosPorCultivo = await transaction.get(permisosPorCultivoRef);
			const concesion = await transaction.get(concesionRef);

			if (permiso.exists) {
				Swal.fire(
					"El permiso ya existe",
					"Está intentando sobreescribir un permiso ya existente, verifique su conexión.",
					"error"
				);

				throw new Error("El permiso ya existe!");
			} else {
				if (concesion.exists) {
					transaction.update(concesionRef, {
						supExpedida: firebase.firestore.FieldValue.increment(allData.supAutorizada)
					});

					transaction.update(concesionModuloRef, {
						supExpedida: firebase.firestore.FieldValue.increment(allData.supAutorizada)
					});
				}

				transaction.set(permisoRef, data);

				if (data.permisosVinculados.length > 0) {
					data.permisosVinculados.forEach((permiso) => {
						const permisoComplementoRef = db
							.collection(`permisos`)
							.doc(data.ciclo)
							.collection("modulos")
							.doc(`Modulo-${data.modulo}`)
							.collection(`permisos`)
							.doc(permiso);

						// Puse array de permisos vinculados a pesar de que solo es un permiso ya que el proceso de cancelacion de permisos requiere un array de permisos.
						const arrayPermisos = [];
						arrayPermisos.push(data.numeroPermiso);

						transaction.update(permisoComplementoRef, {
							permisosVinculados: arrayPermisos,
							observaciones: `Complemento aplicado en el permiso "${data.numeroPermiso}" de la cuenta "${data.cuenta}".`
						});
					});
				}

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
		Swal.fire("Error de conexión", "Por favor intente más tarde.", "error");
		console.error(error);
		return false;
	}
};
