import { db } from "../firebase/firebase-config";

export const loadNombresCultivos = async () => {
	const cultivosSnap = await db.collection(`cultivos`).orderBy("clave").get();

	const cultivos = [];

	cultivosSnap.forEach((snapHijo) => {
		cultivos.push({
			clave: snapHijo.data().clave,
			cultivo: snapHijo.data().nombre,
			subciclo: snapHijo.data().subciclo
		});
	});

	return cultivos;
};
