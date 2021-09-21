import { db } from "../../firebase/firebase-config";

export const loadEntities = async () => {
	const entidadesSnap = await db.collection(`entidades`).get();

	const entities = [];

	entidadesSnap.forEach((snapHijo) => {
		entities.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	return entities;
};
