import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const saveTechnicianModules = async (id, modulos, otherTechnicians) => {
	// TODO: Asignar ciclo de forma dinamica

	Swal.fire({
		title: "Actualizando...",
		text: "Por favor espere...",
		allowOutsideClick: false,
		didOpen: () => {
			Swal.showLoading();
		}
	});
	const updates = getUpdates(modulos, otherTechnicians);
	updates.push({ id, modulos });

	const currentPermisosRefs = await db
		.collectionGroup("permisos")
		.where("tecnico", "==", id)
		.where("ciclo", "==", "2020-2021")
		.get();

	const newPermisosRefs = await db
		.collectionGroup("permisos")
		.where("tecnico", "!=", id)
		.where("ciclo", "==", "2020-2021")
		.where("modulo", "in", modulos.length > 0 ? modulos : ["x"])
		.get();

	//Traer todos los permisos del tecnico
	//Verificar que los permisos coincidan conrrespondan con alguno de los modulos a actualizar
	//	Si no corresponde crear consulat para dejar el campo bacio
	//Traer todos los permisos de los modulos a asignar que no tengan al tecnico
	//Crear consultas para actualizar

	let batch = db.batch();
	let i = 1;
	const batchSize = 500;

	try {
		let removidos = 0;
		let asignados = 0;

		updates.forEach((update) => {
			batch.update(db.collection("usuarios").doc(update.id), { modulos: update.modulos });
			if (i === batchSize) {
				batch
					.commit()
					.then(() => {
						console.log("Se termino de subir batch");
					})
					.catch((err) => {
						console.error(err);
					});

				batch = db.batch();
				i = 0;
			}

			i++;
		});

		currentPermisosRefs.forEach((permit) => {
			if (!modulos.includes(permit.data().modulo)) {
				batch.update(
					db
						.collection("permisos")
						.doc("2020-2021")
						.collection("modulos")
						.doc(`Modulo-${permit.data().modulo}`)
						.collection("permisos")
						.doc(permit.id),
					{ tecnico: "" }
				);
				removidos++;

				if (i === batchSize) {
					batch
						.commit()
						.then(() => {
							console.log("Se termino de subir batch");
						})
						.catch((err) => {
							console.error(err);
						});

					batch = db.batch();
					i = 0;
				}

				i++;
			}
		});

		newPermisosRefs.forEach((permit) => {
			batch.update(
				db
					.collection("permisos")
					.doc("2020-2021")
					.collection("modulos")
					.doc(`Modulo-${permit.data().modulo}`)
					.collection("permisos")
					.doc(permit.id),
				{ tecnico: id }
			);
			asignados++;

			if (i === batchSize) {
				batch
					.commit()
					.then(() => {
						console.log("Se termino de subir batch");
					})
					.catch((err) => {
						console.error(err);
					});

				batch = db.batch();
				i = 0;
			}

			i++;
		});

		batch
			.commit()
			.then(() => {
				console.log("Se terminaron de actualizar los permisos");
				Swal.close();
				Swal.fire(
					"Cambios guardados",
					`Se aplicaron los cambios en la asignación de predios. 
				${asignados} predios asignados.
				${removidos} predios removidos.`,
					"success"
				);
			})
			.catch((err) => {
				console.error(err);
			});

		return updates;
	} catch (error) {
		Swal.close();
		Swal.fire("Error de conexión", "Error al intentar guardar los cambios.", "error");
		console.error(error);
		return false;
	}
};
const getUpdates = (modulos, otherTechnicians) => {
	const techniciansCopy = [];
	otherTechnicians.forEach((technician) => {
		techniciansCopy.push({ id: technician.id, modulos: [...technician.modulos] });
	});

	modulos.forEach((modulo) => {
		techniciansCopy.forEach((technician, i) => {
			if (technician.modulos.includes(modulo)) {
				const j = technician.modulos.indexOf(modulo);
				techniciansCopy[i].modulos.splice(j, 1);
			}
		});
	});

	const updates = [];

	for (let i = 0; i < otherTechnicians.length; i++) {
		if (otherTechnicians[i].modulos.length !== techniciansCopy[i].modulos.length) {
			updates.push(techniciansCopy[i]);
		}
	}

	return updates;
};
