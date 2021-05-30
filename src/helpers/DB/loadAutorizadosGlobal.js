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

export const loadAutorizadosGlobal = async () => {
	let autorizados = [];

	const autorizadosPromises = modulos.map((modulo) => {
		return loadAutorizados(modulo, "2020-2021");
	});

	const data = await Promise.all(autorizadosPromises);

	data.forEach((item) => {
		item.forEach((childItem) => {
			autorizados.push({
				id: childItem.id,
				...childItem.data()
			});
		});
	});

	if (autorizados.length === 0) autorizados = false;

	return autorizados;
};
