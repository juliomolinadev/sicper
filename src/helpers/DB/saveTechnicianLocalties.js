import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const saveTechnicianLocalties = async (id, nombre, localties, otherTechnicians) => {
	// TODO: Asignar ciclo de forma dinamica

	//Traer todos los permisos que coinsidan con las localidades que no tengan al tecnico
	//Asignar a los permisos de la consulta anterior el nuevo tecnico
	//En la tabla de usuarios actualizar las localidades que se asignaron al tecnico

	Swal.fire({
		title: "Actualizando...",
		text: "Por favor espere...",
		allowOutsideClick: false,
		didOpen: () => {
			Swal.showLoading();
		}
	});
	const updates = getUpdates(localties, otherTechnicians);
	updates.push({ id, nombre, localidades: localties });

	const newPermisosRefs = await db
		.collectionGroup("permisos")
		.where("tecnico", "!=", id)
		.where("ciclo", "==", "2020-2021")
		.where("claveLocalidad", "in", localties.length > 0 ? localties : ["x"])
		.get();

	const idPadronPromises = [];
	updates.forEach((technician) => {
		technician.localidades.forEach((claveLocalidad) => {
			idPadronPromises.push(db.collection("colonias").where("clave", "==", claveLocalidad).get());
		});
	});

	const idPadronResolvedPromises = await Promise.all(idPadronPromises);
	const padronLocalties = [];

	idPadronResolvedPromises.forEach((snap) => {
		snap.forEach((localtie) => {
			padronLocalties.push({ id: localtie.id, clave: localtie.data().clave });
		});
	});

	const updatesInPadron = [];
	updates.forEach((technician) => {
		technician.localidades.forEach((claveLocalidad) => {
			const localtie = padronLocalties.find((localtie) => localtie.clave === claveLocalidad);

			updatesInPadron.push({ id: localtie.id, tecnico: technician.nombre });
		});
	});

	let batch = db.batch();
	let i = 1;
	const batchSize = 500;

	try {
		let asignados = 0;

		updatesInPadron.forEach((localtie) => {
			batch.update(db.collection("colonias").doc(localtie.id), {
				tecnico: localtie.tecnico
			});

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

		updates.forEach((update) => {
			batch.update(db.collection("usuarios").doc(update.id), { localidades: update.localidades });
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
				${asignados} predios asignados.`,
					// ${removidos} predios removidos.`,
					"success"
				);
			})
			.catch((err) => {
				console.error(err);
			});

		return { updates, updatesInPadron };
	} catch (error) {
		Swal.close();
		Swal.fire("Error de conexión", "Error al intentar guardar los cambios.", "error");
		console.error(error);
		return false;
	}
};
const getUpdates = (localties, otherTechnicians) => {
	/* 	
	Toma un arreglo con los datos de los tecnicos que no se estan procesando y retorna un array con objetos 
	que contienen la clave del tecnico y un objeto con las localidades que le quedan despues de
	quitarle las localidades que se le estan asignando al tecnico que se esta procesando
 	*/

	const techniciansCopy = [];
	otherTechnicians.forEach((technician) => {
		techniciansCopy.push({
			id: technician.id,
			nombre: technician.nombre,
			localidades: [...technician.localidades]
		});
	});

	localties.forEach((localtie) => {
		techniciansCopy.forEach((technician, i) => {
			if (technician.localidades.includes(localtie)) {
				const j = technician.localidades.indexOf(localtie);
				techniciansCopy[i].localidades.splice(j, 1);
			}
		});
	});

	const updates = [];

	for (let i = 0; i < otherTechnicians.length; i++) {
		if (otherTechnicians[i].localidades.length !== techniciansCopy[i].localidades.length) {
			updates.push(techniciansCopy[i]);
		}
	}
	// Retorna solo los tecnicos que fueron modificados
	return updates;
};
