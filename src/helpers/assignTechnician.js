import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const assignTechnician = async (ciclo, modulo, localties, tecnico) => {
	let localtiesGroup = [];
	const dataPromises = [];

	const pushOnPermitsData = (localtiesForLoad) => {
		dataPromises.push(
			db
				.collection(`permisos`)
				.doc(ciclo)
				.collection("modulos")
				.doc(`Modulo-${modulo}`)
				.collection(`permisos`)
				.where("localidad", "in", localtiesForLoad)
				.where("tecnico", "==", "sinAsignar")
				.get()
		);
	};

	localties.forEach((location, i) => {
		localtiesGroup.push(location);
		if (localtiesGroup.length === 10) {
			pushOnPermitsData(localtiesGroup);
			localtiesGroup.splice(0, localtiesGroup.length);
			i = 0;
		}
	});

	if (localtiesGroup.length > 0) pushOnPermitsData(localtiesGroup);

	await Promise.all(dataPromises).then((promisesResults) => {
		promisesResults.forEach((promise) => {
			promise.forEach((snapHijo) => {
				db.runTransaction(async (transaction) => {
					return transaction.get(snapHijo.ref).then((permiso) => {
						if (!permiso.exists) {
							console.log("Document does not exist!");
						}

						transaction.update(snapHijo.ref, { tecnico: tecnico });
					});
				})
					.then(() => {
						console.log("Transaction successfully committed!");
						return true;
					})
					.catch((error) => {
						console.log("Transaction failed: ", error);
					});
			});
			Swal.fire(
				"Técnico asignado",
				"El técnico se asignó con éxito en las localidades seleccionadas.",
				"success"
			);
		});
	});
};
