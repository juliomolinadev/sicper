import { db } from "../firebase/firebase-config";

export const loadLocalidad = async (clave) => {
	const localidadSnap = await db.collection(`colonias`).where("clave", "==", clave).get();

	const localidades = [];

	localidadSnap.forEach((snapHijo) => {
		localidades.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	if (localidades.length === 0) return "";
	else return localidades[0].nombre;
};
