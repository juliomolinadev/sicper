import { modulos } from "../consts";
import { db } from "../../firebase/firebase-config";

const loadExpedicion = (modulo, ciclo) => {
	return db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisosPorCultivo`)
		.orderBy("modulo")
		.get();
};

export const loadAvanceSuperficieExpedida = async () => {
	let expedicion = [];

	const expedicionPromises = modulos.map((modulo) => {
		return loadExpedicion(modulo, "2020-2021");
	});

	const data = await Promise.all(expedicionPromises);

	data.forEach((item) => {
		item.forEach((childItem) => {
			expedicion.push({
				id: childItem.id,
				...childItem.data()
			});
		});
	});

	if (expedicion.length === 0) expedicion = false;

	return expedicion;
};
