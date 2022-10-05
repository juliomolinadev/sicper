import { db } from "../../firebase/firebase-config";

export const loadPadronesDeCultivos = async (ciclo) => {
	const padronesSnap = await db.collectionGroup("padron").where("ciclo", "==", ciclo).get();
	const modulosSnap = await db.collectionGroup("modulos").where("ciclo", "==", ciclo).get();

	const concesiones = [];
	const cultivos = [];
	const modulos = [];

	padronesSnap.forEach((registro) => {
		const i = cultivos.findIndex((cultivo) => cultivo === registro.data().cultivo);
		if (i === -1) cultivos.push(registro.data().cultivo);
		concesiones.push({
			id: registro.id,
			...registro.data()
		});
	});

	modulosSnap.forEach((modulo) => {
		modulos.push({ id: modulo.id, ...modulo.data() });
	});

	return { concesiones, cultivos, modulos };
};
