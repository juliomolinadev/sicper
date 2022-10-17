import { db } from "../../firebase/firebase-config";
import firebase from "firebase/app";
import Swal from "sweetalert2";

export const cancelPermit = async (permit, uid) => {
	const {
		numeroPermiso,
		modulo,
		ciclo,
		claveCultivo,
		nombreCultivo,
		sistema,
		tipo,
		supAutorizada
	} = permit;
	const fecha = new Date();

	db.collection(`permisos`)
		.doc(ciclo)
		.collection(`modulos`)
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.doc(numeroPermiso)
		.update({
			estadoPermiso: "Cancelado",
			cuotaCultivo: 0,
			fechaCancelacion: fecha,
			apruebaCancelacion: uid
		});

	try {
		const permisoRef = db
			.collection(`permisos`)
			.doc(ciclo)
			.collection(`modulos`)
			.doc(`Modulo-${modulo}`)
			.collection(`permisos`);

		const permisosExpedidosRef = db
			.collection(`permisos`)
			.doc(ciclo)
			.collection("modulos")
			.doc(`Modulo-${modulo}`);

		const permisosPorCultivoRef = db
			.collection(`permisos`)
			.doc(ciclo)
			.collection("modulos")
			.doc(`Modulo-${modulo}`)
			.collection(`permisosPorCultivo`)
			.doc(`${claveCultivo}-${nombreCultivo}`);

		const concesionRef = db
			.collection("padronesCultivos")
			.doc(ciclo)
			.collection("padrones")
			.doc(permit.nombreCultivo)
			.collection("padron")
			.doc(`${permit.idProductorSelected}-${permit.nombreCultivo}-${modulo}`);

		const concesionModuloRef = db
			.collection("padronesCultivos")
			.doc(ciclo)
			.collection("padrones")
			.doc(permit.nombreCultivo)
			.collection("modulos")
			.doc(`${permit.nombreCultivo}-${modulo}`);

		const isCancel = await db.runTransaction(async (transaction) => {
			if (permit.permisosVinculados && permit.permisosVinculados.length > 0) {
				permit.permisosVinculados.forEach((permiso) => {
					transaction.update(permisoRef.doc(permiso), {
						permisosVinculados: [],
						observaciones: ""
					});
				});

				transaction.update(permisoRef.doc(numeroPermiso), {
					estadoPermiso: "Cancelado",
					cuotaCultivo: 0,
					fechaCancelacion: fecha,
					apruebaCancelacion: uid,
					permisosVinculados: [],
					observaciones: ""
				});

				transaction.update(concesionRef, {
					supExpedida: firebase.firestore.FieldValue.increment(supAutorizada * -1)
				});

				transaction.update(concesionModuloRef, {
					supExpedida: firebase.firestore.FieldValue.increment(supAutorizada * -1)
				});
			} else {
				transaction.update(permisoRef.doc(numeroPermiso), {
					estadoPermiso: "Cancelado",
					cuotaCultivo: 0,
					fechaCancelacion: fecha,
					apruebaCancelacion: uid
				});
			}

			transaction.update(permisosExpedidosRef, {
				superficieModulo: firebase.firestore.FieldValue.increment(supAutorizada * -1)
			});

			switch (sistema) {
				case "Gravedad":
					if (tipo === "normal") {
						transaction.update(permisosPorCultivoRef, {
							numeroPermisos: firebase.firestore.FieldValue.increment(-1),
							superficie: firebase.firestore.FieldValue.increment(supAutorizada * -1),
							gravedadNormal: firebase.firestore.FieldValue.increment(supAutorizada * -1)
						});
					}

					if (tipo === "extra") {
						transaction.update(permisosPorCultivoRef, {
							numeroPermisos: firebase.firestore.FieldValue.increment(-1),
							superficie: firebase.firestore.FieldValue.increment(supAutorizada * -1),
							gravedadExtra: firebase.firestore.FieldValue.increment(supAutorizada * -1)
						});
					}
					break;

				case "Pozo Federal":
					if (tipo === "normal") {
						transaction.update(permisosPorCultivoRef, {
							numeroPermisos: firebase.firestore.FieldValue.increment(-1),
							superficie: firebase.firestore.FieldValue.increment(supAutorizada * -1),
							pozoNormal: firebase.firestore.FieldValue.increment(supAutorizada * -1)
						});
					}

					if (tipo === "extra") {
						transaction.update(permisosPorCultivoRef, {
							numeroPermisos: firebase.firestore.FieldValue.increment(-1),
							superficie: firebase.firestore.FieldValue.increment(supAutorizada * -1),
							pozoExtra: firebase.firestore.FieldValue.increment(supAutorizada * -1)
						});
					}
					break;

				case "Pozo Particular":
					if (tipo === "normal") {
						transaction.update(permisosPorCultivoRef, {
							numeroPermisos: firebase.firestore.FieldValue.increment(-1),
							superficie: firebase.firestore.FieldValue.increment(supAutorizada * -1),
							pozoParticularNormal: firebase.firestore.FieldValue.increment(supAutorizada * -1)
						});
					}

					if (tipo === "extra") {
						transaction.update(permisosPorCultivoRef, {
							numeroPermisos: firebase.firestore.FieldValue.increment(-1),
							superficie: firebase.firestore.FieldValue.increment(supAutorizada * -1),
							pozoParticularExtra: firebase.firestore.FieldValue.increment(supAutorizada * -1)
						});
					}
					break;

				default:
					console.log("Sistema de riego indefinido");
					break;
			}

			return true;
		});

		if (isCancel) {
			Swal.fire("Permiso cancelado", `Se canceló con exito el permiso ${numeroPermiso}`, "success");
		}

		return true;
	} catch (error) {
		Swal.fire("Error de conexión", "Por favor intente más tarde.", "error");
		console.error(error);
		return false;
	}
};
