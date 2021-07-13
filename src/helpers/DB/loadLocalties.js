import { db } from "../../firebase/firebase-config";

export const loadLocalties = async (localtie) => {
	const localtiesSnap = await db
		.collection(`colonias`)
		.orderBy("nombre")
		.startAt(localtie)
		.endAt(localtie + "\uf8ff")
		.get();

	const localties = [];

	localtiesSnap.forEach((snapHijo) => {
		localties.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	return localties;
};
