import { db } from "../firebase/firebase-config";

export const loadLocalidad = async (clave) => {
	const localidadSnap = await db.collection(`colonias`).where("clave", "==", clave).get();

	const localidad = [];

	localidadSnap.forEach((snapHijo) => {
		localidad.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	console.log(localidad[0].nombre);
	return localidad[0].nombre;
};
