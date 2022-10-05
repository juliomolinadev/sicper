import { db } from "../../firebase/firebase-config";

export const loadConcesiones = async (ciclo, productores) => {
	const concesiones = [];
	const concesionesPromices = [];
	const concesionesPad = db.collectionGroup("padron").where("ciclo", "==", ciclo);

	productores.forEach((productor) => {
		concesionesPromices.push(concesionesPad.where("idProductor", "==", productor).get());
	});

	const concesionesResueltas = await Promise.all(concesionesPromices);

	concesionesResueltas.forEach((productor) => {
		productor.forEach((concesion) => {
			concesiones.push(concesion.data());
		});
	});

	return concesiones;
};
