import { db } from "../firebase/firebase-config";
import { loadNombreCultivos } from "./loadNombresCultivos";

export const loadAutorizados = async (modulo) => {
	const autorizadosSnap = await db
		.collection(`autorizados`)
		.doc(`autorizadosM${modulo}`)
		.collection(`autorizados`)
		.orderBy(`cultivo`)
		.get();

	let autorizados = [];

	autorizadosSnap.forEach((snapHijo) => {
		autorizados.push({
			...snapHijo.data()
		});
	});

	const nombresCultivos = await loadNombreCultivos();

	if (autorizados.length === 0) {
		nombresCultivos.forEach((cultivo) => {
			autorizados.push({
				cultivo: cultivo,
				normal: 0,
				extra: 0,
				disponible: 0
			});
		});
	}

	return autorizados;
};
