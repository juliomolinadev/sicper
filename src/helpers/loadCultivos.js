import { db } from "../firebase/firebase-config";

export const loadCultivos = async (cultivo) => {
	const cultivosSnap = await db
		.collection(`cultivos`)
		.orderBy("nombre")
		.startAt(cultivo)
		.endAt(cultivo + "\uf8ff")
		.get();

	const cultivos = [];

	cultivosSnap.forEach((snapHijo) => {
		cultivos.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	return cultivos;
};
