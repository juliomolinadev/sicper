import { db } from "../firebase/firebase-config";
import { loadNombresCultivos } from "./loadNombresCultivos";

export const loadAutorizados = async (ciclo, modulo) => {
	const autorizadosSnap = await db
		.collection(`autorizados`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`autorizados`)
		.orderBy(`clave`)
		.get();

	let autorizados = [];

	autorizadosSnap.forEach((snapHijo) => {
		autorizados.push({
			...snapHijo.data()
		});
	});

	const nombresCultivos = await loadNombresCultivos();

	if (autorizados.length === 0) {
		nombresCultivos.forEach((cultivo) => {
			autorizados.push({
				clave: cultivo.clave,
				cultivo: cultivo.cultivo,
				gravedadNormalAutorizada: 0,
				gravedadNormalAsignada: 0,
				gravedadExtraAutorizada: 0,
				gravedadExtraAsignada: 0,
				pozoNormalAutorizada: 0,
				pozoNormalAsignada: 0,
				pozoExtraAutorizada: 0,
				pozoExtraAsignada: 0
			});
		});
	}

	return autorizados;
};
