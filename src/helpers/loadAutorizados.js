import { db } from "../firebase/firebase-config";
import { loadNombresCultivos } from "./loadNombresCultivos";

export const loadAutorizados = async (modulo) => {
	const autorizadosSnap = await db
		.collection(`autorizados`)
		.doc(`autorizadosM${modulo}`)
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
				normalGravedad: 0,
				extraGravedad: 0,
				asignadaGravedad: 0,
				normalPozoFederal: 0,
				extraPozoFederal: 0,
				asignadaPozoFederal: 0,
				normalPozoParticular: 0,
				extraPozoParticular: 0,
				asignadaPozoParticular: 0
			});
		});
	}

	return autorizados;
};
