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
				subciclo: cultivo.subciclo,
				gravedadNormalAutorizada: 0,
				gravedadNormalAsignada: 0,
				gravedadExtraAutorizada: 0,
				gravedadExtraAsignada: 0,
				pozoNormalAutorizada: 0,
				pozoNormalAsignada: 0,
				pozoExtraAutorizada: 0,
				pozoExtraAsignada: 0
				// pozoParticularNormal: 0,
				// pozoParticularExtra: 0
			});
		});
	} else {
		nombresCultivos.forEach((cultivo) => {
			const autorizado = autorizados.find((autorizado) => autorizado.clave === cultivo.clave);
			if (autorizado === undefined) {
				autorizados.push({
					clave: cultivo.clave,
					cultivo: cultivo.cultivo,
					subciclo: cultivo.subciclo,
					gravedadNormalAutorizada: 0,
					gravedadNormalAsignada: 0,
					gravedadExtraAutorizada: 0,
					gravedadExtraAsignada: 0,
					pozoNormalAutorizada: 0,
					pozoNormalAsignada: 0,
					pozoExtraAutorizada: 0,
					pozoExtraAsignada: 0
					// pozoParticularNormal: 0,
					// pozoParticularExtra: 0
				});
			}
		});
	}

	return autorizados;
};

export const loadAutorizadoPorCultivo = async (ciclo, modulo, claves) => {
	const autorizadosPromises = [];

	claves.forEach((clave) => {
		autorizadosPromises.push(
			db
				.collection(`autorizados`)
				.doc(ciclo)
				.collection("modulos")
				.doc(`Modulo-${modulo}`)
				.collection(`autorizados`)
				.where("clave", "==", clave)
				.get()
		);
	});
	const autorizadosResolved = await Promise.all(autorizadosPromises);

	const autorizados = [];

	autorizadosResolved.forEach((snapHijo) => {
		snapHijo.forEach((autorizado) => {
			autorizados.push({
				...autorizado.data()
			});
		});
	});

	return autorizados;
};
