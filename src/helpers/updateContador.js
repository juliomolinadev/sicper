import { db } from "../firebase/firebase-config";
import { loadContador } from "./loadContador";

export const updateContador = async (entidad) => {
	const contador = (await loadContador(entidad)) + 1;

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

	db.collection("contadoresPermisos").doc(contadores[0].id).update({ cuenta: contador });
};
