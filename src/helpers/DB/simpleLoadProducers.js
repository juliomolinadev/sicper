import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";
import { loadProducersPerModulo } from "./loadProducersPerModulo";

export const simpleLoadProducers = async (palabra = "", campo, ciclo, modulo) => {
	const producers = [];
	const qrysProducers = [];
	const producersRef = db.collection(`productores`);
	const curps = await loadProducersPerModulo(ciclo, modulo);

	curps.forEach((group) => {
		qrysProducers.push(producersRef.where("curp", "in", group).get());
	});

	const resolvedProducersQrys = await Promise.all(qrysProducers);

	resolvedProducersQrys.forEach((snap) => {
		snap.forEach((snapHijo) => {
			producers.push({
				...snapHijo.data()
			});
		});
	});

	if (palabra.length > 0) {
		const filteredProducers = producers.filter((producer) =>
			producer[campo].includes(palabra.toUpperCase())
		);

		if (filteredProducers.length === 0) {
			Swal.fire("No se encontraron productores ", "...", "warning");
		}
		return filteredProducers;
	} else return producers;
};
