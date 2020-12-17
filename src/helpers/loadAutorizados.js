import { db } from "../firebase/firebase-config";
import { loadNombreCultivos } from "./loadNombresCultivos";

export const loadAutorizados = async (modulo) => {
	const autorizadosSnap = await db
		.collection(`autorizados`)
		.doc(`autorizadosM${modulo}`)
		.collection(`autorizados`)
		.get();

	const nombresCultivos = await loadNombreCultivos();

	let autorizados = [];

	if (autorizadosSnap.size !== 0) {
		autorizadosSnap.forEach((snapHijo) => {
			autorizados.push({
				id: snapHijo.id,
				...snapHijo.data()
			});
		});
	} else {
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
