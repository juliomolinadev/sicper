import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const sabeAutorizados = (ciclo, modulo, autorizados) => {
	autorizados.forEach((autorizado) => {
		const totalNormal = autorizado.gravedadNormalAutorizada + autorizado.pozoNormalAutorizada;
		const totalExtra = autorizado.gravedadExtraAutorizada + autorizado.pozoExtraAutorizada;
		const totalCultivo = totalNormal + totalExtra;

		db.collection("autorizados")
			.doc(ciclo)
			.collection("modulos")
			.doc(`Modulo-${modulo}`)
			.collection(`autorizados`)
			.doc(`${autorizado.clave}-${autorizado.cultivo}`)
			.set({
				modulo,
				clave: autorizado.clave,
				cultivo: autorizado.cultivo,
				superficieNormal: totalNormal,
				superficieExtra: totalExtra,
				superficieTotal: totalCultivo,
				gravedadNormalAutorizada: autorizado.gravedadNormalAutorizada,
				gravedadNormalAsignada: autorizado.gravedadNormalAsignada,
				gravedadExtraAutorizada: autorizado.gravedadExtraAutorizada,
				gravedadExtraAsignada: autorizado.gravedadExtraAsignada,
				pozoNormalAutorizada: autorizado.pozoNormalAutorizada,
				pozoNormalAsignada: autorizado.pozoNormalAsignada,
				pozoExtraAutorizada: autorizado.pozoExtraAutorizada,
				pozoExtraAsignada: autorizado.pozoExtraAsignada
			})
			.then(function () {
				console.log("Document successfully written!");
			})
			.catch(function (error) {
				console.error("Error writing document: ", error);
			});
	});
	// TODO: Hacer que se dispare la alerta hasta que se terminen de guardar los autorizados
	Swal.fire("Autorizados Guardados", "Se registraron con éxito los cambios.", "success");
	return true;
};
