import { db } from "../../firebase/firebase-config";

export const loadCiclo = async () => {
	const roles = await db.collection(`app`).doc("variablesGlobales").get();
	return roles.data().cicloActual;
};
