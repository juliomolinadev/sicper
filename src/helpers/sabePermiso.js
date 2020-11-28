import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const sabePermiso = (allData) => {
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
		fechaEmicion: allData.fechaEmicion,
		fechaLimite: allData.fechaLimite,
		vigencia: allData.vigencia,
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
		transferencia: allData.transferencia
	};

	db.collection(`permisos`)
		.add(data)
		.then(() => {
			Swal.fire("Permiso Guardado", "Se registró con éxito el nuevo permiso de riego.", "success");
		})
		.catch((e) => console.log("Error", e));
};
