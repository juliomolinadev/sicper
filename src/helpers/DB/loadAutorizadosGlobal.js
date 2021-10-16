import { modulos } from "../consts";
import { db } from "../../firebase/firebase-config";

const loadAutorizados = (modulo, ciclo) => {
	return db
		.collection(`autorizados`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`autorizados`)
		.orderBy("modulo")
		.get();
};

export const loadAutorizadosGlobal = async (ciclo) => {
	let autorizados = [];

	const autorizadosPromises = modulos.map((modulo) => {
		if (modulo !== "dev") {
			return loadAutorizados(modulo, ciclo);
		} else return loadAutorizados(99, ciclo);
	});

	const data = await Promise.all(autorizadosPromises);

	data.forEach((item) => {
		item.forEach((childItem) => {
			if (childItem.id !== "0-SIN CULTIVO") {
				autorizados.push({
					id: childItem.id,
					...childItem.data()
				});
			}
		});
	});

	if (autorizados.length === 0) autorizados = false;

	return autorizados;
};
