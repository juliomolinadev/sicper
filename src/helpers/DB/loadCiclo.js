import { db } from "../../firebase/firebase-config";

export const loadCiclo = async () => {
	const estado = await db.collection(`app`).doc("variablesGlobales").get();
	return estado.data().cicloActual;
};
