import { db } from "../firebase/firebase-config";

export const loadExpedicion = async (modulo, ciclo) => {
	let superficies = [];

	console.log(modulo, ciclo);

	await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisosPorCultivo`)
		.orderBy("superficie", "desc")
		.get()
		.then((superficiesSnap) => {
			superficiesSnap.forEach((snapHijo) => {
				superficies.push({
					id: snapHijo.id,
					...snapHijo.data()
				});
			});
		})
		.catch((e) => {
			console.log(" Error: ", e);
		});

	if (superficies.length === 0) superficies = false;

	return superficies;
};
