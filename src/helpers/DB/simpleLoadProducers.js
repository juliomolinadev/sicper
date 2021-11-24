import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";
import { loadProducersPerModulo } from "./loadProducersPerModulo";

export const simpleLoadProducers = async (pairs, ciclo, modulo) => {
	const { palabra = 0, campo } = pairs[0];
	const producers = [];
	const producersFiltrados = [];
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

	const filteredProducers = producers.filter((producer) =>
		producer[campo].includes(palabra.toUpperCase())
	);

	producersFiltrados.push(filteredProducers);

	if (pairs.length > 1) {
		for (let i = 1; i <= pairs.length - 1; i++) {
			const producers = producersFiltrados.pop();
			producersFiltrados.push(
				producers.filter(
					(producer) => producer[pairs[i].campo] === ifIsNumber(pairs[i].campo, pairs[i].palabra)
				)
			);
		}
	}

	if (filteredProducers.length === 0) {
		Swal.fire("No se encontraron productores ", "...", "warning");
	}
	return producersFiltrados.pop();
};

const ifIsNumber = (campo, value) => {
	switch (campo) {
		case "seccion":
			return parseInt(value);

		default:
			return value;
	}
};
