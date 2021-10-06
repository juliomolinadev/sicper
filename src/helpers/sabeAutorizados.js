import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

const decideEstado = (modulo) => {
	if (modulo === 1 || modulo === 2 || modulo === 3) return "Sonora";
	else return "Baja California";
};

export const sabeAutorizados = (ciclo, modulo, autorizados) => {
	const batch = db.batch();

	autorizados.forEach((autorizado) => {
		const autorizadoRef = db
			.collection("autorizados")
			.doc(ciclo)
			.collection("modulos")
			.doc(`Modulo-${modulo}`)
			.collection(`autorizados`)
			.doc(`${autorizado.clave}-${autorizado.cultivo}`);

		const totalNormal = autorizado.gravedadNormalAutorizada + autorizado.pozoNormalAutorizada;
		const totalExtra = autorizado.gravedadExtraAutorizada + autorizado.pozoExtraAutorizada;
		const totalCultivo = totalNormal + totalExtra;
		const estado = decideEstado(modulo);

		batch.set(autorizadoRef, {
			estado,
			modulo,
			clave: autorizado.clave,
			cultivo: autorizado.cultivo,
			subciclo: autorizado.subciclo,
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
		});
	});

	batch
		.commit()
		.then(() => {
			console.log("Se registraron con éxito los cambios.");
			Swal.fire("Autorizados Guardados", "Se registraron con éxito los cambios.", "success");
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
};
