import { db } from "../firebase/firebase-config";

export const loadNombreCultivos = async () => {
	const cultivosSnap = await db.collection(`cultivos`).orderBy("clave").get();

	const cultivos = [];

	cultivosSnap.forEach((snapHijo) => {
		cultivos.push(`${snapHijo.data().clave}-${snapHijo.data().nombre}`);
	});

	return cultivos;
};
