import { db } from "../firebase/firebase-config";

export const loadContador = async (modulo, ciclo) => {
	let contador = 0;
	await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				contador = doc.data().numeroPermisosModulo;
			} else {
				db.collection(`permisos`)
					.doc(ciclo)
					.collection("modulos")
					.doc(`Modulo-${modulo}`)
					.set({ numeroPermisosModulo: 0 });
			}
		})
		.catch((e) => {
			console.log(" Error: ", e);
		});

	return contador;
};
