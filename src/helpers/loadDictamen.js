import { db } from "../firebase/firebase-config";

export const loadDictamen = async (cuenta, ciclo) => {
	const dictamen = await db
		.collection(`dictamenes`)
		.doc(ciclo)
		.collection("dictamenes")
		.doc(cuenta)
		.get();

	if (dictamen.exists) return dictamen.data();
	else return false;
};
