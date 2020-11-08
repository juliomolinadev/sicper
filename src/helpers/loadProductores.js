import { db } from "../firebase/firebase-config";

export const loadProductores = async (productor) => {
	const usuariosSnap = await db
		.collection(`productores`)
		.orderBy("apPaterno")
		.startAt(productor)
		.endAt(productor + "\uf8ff")
		.get();

	const productores = [];

	usuariosSnap.forEach((snapHijo) => {
		productores.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	return productores;
};
