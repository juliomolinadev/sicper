import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";
import moment from "moment";
import firebase from "firebase/app";
import "firebase/firestore";

export const sabePermiso = async (allData) => {
	const data = {
		idUsuarioSelected: allData.idUsuarioSelected,
		cuenta: allData.cuenta,
		usuario: allData.usuario,
		supDerecho: allData.supDerecho,
		lote: allData.lote,
		localidad: allData.localidad,
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
		dotacion: allData.dotacion,
		titular: allData.titular,
		transferencia: allData.transferencia,
		estadoPermiso: "activo"
	};

	const isSave = await db
		.collection(`permisos`)
		.doc(`permisosM${data.modulo}`)
		.collection(`permisos`)
		.add(data)
		.then(() => {
			db.collection(`permisos`)
				.doc(`permisosM${data.modulo}`)
				.update({
					numeroPermisosModulo: firebase.firestore.FieldValue.increment(1),
					superficieModulo: firebase.firestore.FieldValue.increment(allData.supAutorizada)
				});

			db.collection(`permisos`)
				.doc(`permisosM${data.modulo}`)
				.collection(`permisosPorCultivo`)
				.doc(`${data.claveCultivo}-${data.nombreCultivo}`)
				.get()
				.then((doc) => {
					if (doc.exists) {
						db.collection(`permisos`)
							.doc(`permisosM${data.modulo}`)
							.collection(`permisosPorCultivo`)
							.doc(`${data.claveCultivo}-${data.nombreCultivo}`)
							.update({
								numeroPermisos: firebase.firestore.FieldValue.increment(1),
								superficie: firebase.firestore.FieldValue.increment(allData.supAutorizada)
							});
					} else {
						db.collection(`permisos`)
							.doc(`permisosM${data.modulo}`)
							.collection(`permisosPorCultivo`)
							.doc(`${data.claveCultivo}-${data.nombreCultivo}`)
							.set({
								numeroPermisos: firebase.firestore.FieldValue.increment(1),
								superficie: firebase.firestore.FieldValue.increment(allData.supAutorizada)
							});
					}
				})
				.catch((e) => {
					console.log("Error", e);
				});

			Swal.fire("Permiso Guardado", "Se registró con éxito el nuevo permiso de riego.", "success");
			return true;
		})
		.catch((e) => {
			console.log("Error", e);
		});

	return isSave;
};
