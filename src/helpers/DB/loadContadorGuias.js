import { db } from "../../firebase/firebase-config";

export const loadContadorGuias = async (ciclo, modulo) => {
	let contador = 0;

	await db
		.collection(`guias`)
		.doc(ciclo)
		.collection("contadores")
		.doc(`Modulo-${modulo}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				contador = doc.data().numeroGuiasModulo;
			} else {
				db.collection(`guias`)
					.doc(ciclo)
					.collection("contadores")
					.doc(`Modulo-${modulo}`)
					.set({ numeroGuiasModulo: 0 });
			}
		})
		.catch((e) => {
			console.log(" Error: ", e);
		});

	return contador;
};
