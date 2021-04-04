import { db } from "../firebase/firebase-config";
import { loadContador } from "./loadContador";

export const updateContador = async (modulo) => {
	const contador = (await loadContador(modulo)) + 1;

	const contadorSnap = await db
		.collection(`contadoresPermisos`)
		.where("claveEntidad", "==", modulo)
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
