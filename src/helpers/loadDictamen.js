import { db } from "../firebase/firebase-config";

export const loadDictamen = async (cuenta, ciclo) => {
	let dictamen = false;
	const dictamenesSnap = await db
		.collection(`dictamenes`)
		.doc(ciclo)
		.collection("dictamenes")
		.doc(cuenta)
		.get();

	if (dictamenesSnap.exists) {
		if (dictamenesSnap.data().estado === "activo") dictamen = true;
	}

	return dictamen;
};
