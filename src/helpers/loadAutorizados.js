import { db } from "../firebase/firebase-config";

export const loadAutorizados = async (modulo) => {
	const autorizadosSnap = await db
		.collection(`autorizados`)
		.doc(`autorizadosM${modulo}`)
		.collection(`autorizados`)
		.get();

	let autorizados = {};

	if (autorizadosSnap.size > 0) {
		autorizadosSnap.forEach((snapHijo) => {
			autorizados.push({
				id: snapHijo.id,
				...snapHijo.data()
			});
		});
	} else {
		const cultivosSnap = await db.collection(`cultivos`).orderBy("clave").get();

		cultivosSnap.forEach((snapHijo) => {
			autorizados = {
				...autorizados,
				[`${snapHijo.data().clave}-${snapHijo.data().nombre}`]: 0
			};
		});
	}

	return autorizados;
};
