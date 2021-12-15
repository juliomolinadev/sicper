import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const loadProducersGlobal = async (inputValue, campo) => {
	const producers = [];
	const producersSnap = await db
		.collection(`productores`)
		.orderBy(campo)
		.startAt(inputValue.toUpperCase())
		.endAt(inputValue.toUpperCase() + "\uf8ff")
		.get();

	producersSnap.forEach((snapHijo) => {
		producers.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	if (producers.length === 0) {
		Swal.fire("No se encontraron productores ", "...", "warning");
	}

	return producers;
};
