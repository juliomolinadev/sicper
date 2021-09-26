import { db } from "../../firebase/firebase-config";

export const loadReacomodos = async () => {
	const reacomodosSnap = await db.collection(`reacomodos`).get();

	const reacomodos = [];

	reacomodosSnap.forEach((snapHijo) => {
		reacomodos.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	return reacomodos;
};
