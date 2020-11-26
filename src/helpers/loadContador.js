import { db } from "../firebase/firebase-config";

export const loadContador = async (entidad) => {
	const contadorSnap = await db
		.collection(`contadoresPermisos`)
		.where("claveEntidad", "==", entidad)
		.get();

	const contadores = [];

	contadorSnap.forEach((snapHijo) => {
		contadores.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});
	return contadores[0].cuenta;
};
