import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/firestore";

export const savePermiso = async (allData) => {
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

	const isSave = await permisoRef
		.get()
		.then((doc) => {
			if (doc.exists) {
				Swal.fire(
					"El permiso ya existe",
					"Está intentando sobreescribir un permiso ya existente, verifique su conexión.",
					"error"
				);
			} else {
				permisoRef.set(data).then(() => {
					permisoRef.get().then((doc) => {
						if (doc.exists) {
							db.collection(`permisos`)
								.doc(data.ciclo)
								.collection("modulos")
								.doc(`Modulo-${data.modulo}`)
								.update({
									numeroPermisosModulo: firebase.firestore.FieldValue.increment(1),
									superficieModulo: firebase.firestore.FieldValue.increment(allData.supAutorizada)
								});

							permisosPorCultivoRef
								.get()
								.then((doc) => {
									if (doc.exists) {
										switch (allData.sistema) {
											case "Gravedad":
												if (allData.tipo === "normal") {
													permisosPorCultivoRef.update({
														numeroPermisos: firebase.firestore.FieldValue.increment(1),
														superficie: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														),
														gravedadNormal: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														)
													});
												}

												if (allData.tipo === "extra") {
													permisosPorCultivoRef.update({
														numeroPermisos: firebase.firestore.FieldValue.increment(1),
														superficie: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														),
														gravedadExtra: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														)
													});
												}
												break;

											case "Pozo Federal":
												if (allData.tipo === "normal") {
													permisosPorCultivoRef.update({
														numeroPermisos: firebase.firestore.FieldValue.increment(1),
														superficie: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														),
														pozoNormal: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														)
													});
												}

												if (allData.tipo === "extra") {
													permisosPorCultivoRef.update({
														numeroPermisos: firebase.firestore.FieldValue.increment(1),
														superficie: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														),
														pozoExtra: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														)
													});
												}
												break;

											case "Pozo Particular":
												if (allData.tipo === "normal") {
													permisosPorCultivoRef.update({
														numeroPermisos: firebase.firestore.FieldValue.increment(1),
														superficie: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														),
														pozoParticularNormal: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														)
													});
												}

												if (allData.tipo === "extra") {
													permisosPorCultivoRef.update({
														numeroPermisos: firebase.firestore.FieldValue.increment(1),
														superficie: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														),
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
													permisosPorCultivoRef.set({
														subciclo: data.subciclo,
														estado: data.estado,
														modulo: data.modulo,
														clave: allData.claveCultivo,
														cultivo: allData.nombreCultivo,
														numeroPermisos: firebase.firestore.FieldValue.increment(1),
														superficie: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														),
														gravedadNormal: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														)
													});
												}

												if (allData.tipo === "extra") {
													permisosPorCultivoRef.set({
														subciclo: data.subciclo,
														estado: data.estado,
														modulo: data.modulo,
														clave: allData.claveCultivo,
														cultivo: allData.nombreCultivo,
														numeroPermisos: firebase.firestore.FieldValue.increment(1),
														superficie: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														),
														gravedadExtra: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														)
													});
												}
												break;

											case "Pozo Federal":
												if (allData.tipo === "normal") {
													permisosPorCultivoRef.set({
														subciclo: data.subciclo,
														estado: data.estado,
														modulo: data.modulo,
														clave: allData.claveCultivo,
														cultivo: allData.nombreCultivo,
														numeroPermisos: firebase.firestore.FieldValue.increment(1),
														superficie: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														),
														pozoNormal: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														)
													});
												}

												if (allData.tipo === "extra") {
													permisosPorCultivoRef.set({
														subciclo: data.subciclo,
														estado: data.estado,
														modulo: data.modulo,
														clave: allData.claveCultivo,
														cultivo: allData.nombreCultivo,
														numeroPermisos: firebase.firestore.FieldValue.increment(1),
														superficie: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														),
														pozoExtra: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														)
													});
												}
												break;

											case "Pozo Particular":
												if (allData.tipo === "normal") {
													permisosPorCultivoRef.set({
														subciclo: data.subciclo,
														estado: data.estado,
														modulo: data.modulo,
														clave: allData.claveCultivo,
														cultivo: allData.nombreCultivo,
														numeroPermisos: firebase.firestore.FieldValue.increment(1),
														superficie: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														),
														pozoParticularNormal: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														)
													});
												}

												if (allData.tipo === "extra") {
													permisosPorCultivoRef.set({
														subciclo: data.subciclo,
														estado: data.estado,
														modulo: data.modulo,
														clave: allData.claveCultivo,
														cultivo: allData.nombreCultivo,
														numeroPermisos: firebase.firestore.FieldValue.increment(1),
														superficie: firebase.firestore.FieldValue.increment(
															allData.supAutorizada
														),
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
								})
								.catch((e) => {
									console.log("Error al obtener permisos por cultivo", e);
								});

							Swal.fire(
								"Permiso Guardado",
								"Se registró con éxito el nuevo permiso de riego.",
								"success"
							);
						}
					});
				});
				return true;
			}
		})
		.catch((e) => {
			console.log("Error al guardar permiso", e);
			Swal.fire("Error", `Verifique su conexión: ${e.message}`, "error");
		});

	return isSave;
};
