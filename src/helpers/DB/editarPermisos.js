import { db } from "../../firebase/firebase-config";
import moment from "moment";

export const editarPermisos = async () => {
	console.log("Entro en edicion");
	const permisosSnap = await db
		.collectionGroup("permisos")
		.where("ciclo", "==", "2022-2023")
		// .where("pagado", "==", true)
		.get();

	const permisos = [];
	permisosSnap.forEach((permiso) => {
		if (permiso.data().nombreCultivo === "TRIGO") {
		}

		const fechaTrigo = moment("12/31/2022");
		const fechaTodo = moment("03/31/2023");

		permisos.push({
			id: permiso.id,
			modulo: permiso.data().modulo,
			fechaLimite:
				permiso.data().nombreCultivo === "TRIGO"
					? moment(fechaTrigo).toDate()
					: moment(fechaTodo).toDate()
		});
	});

	// console.log(permisos);

	let batch = db.batch();
	let i = 1;
	const batchSize = 500;

	permisos.forEach((permiso) => {
		// console.log(permiso);

		const ref = db
			.collection("permisos")
			.doc("2022-2023")
			.collection("modulos")
			.doc(`Modulo-${permiso.modulo}`)
			.collection("permisos")
			.doc(permiso.id);

		batch.update(ref, { fechaLimite: permiso.fechaLimite });

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
			console.log("Se terminaron de editar los permisos");
		})
		.catch((err) => {
			console.error(err);
		});
};
