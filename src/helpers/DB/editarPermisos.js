import { db } from "../../firebase/firebase-config";

export const editarPermisos = async () => {
	console.log("Entro en edicion");
	const permisosSnap = await db
		.collectionGroup("permisos")
		.where("ciclo", "==", "2020-2021")
		.where("pagado", "==", true)
		.get();

	const permisos = [];
	permisosSnap.forEach((permiso) => {
		permisos.push({
			id: permiso.id,
			modulo: permiso.data().modulo,
			laboresPendientes: permiso.data().laboresPendientes
		});
	});

	// console.log(permisos);

	let batch = db.batch();
	let i = 1;
	const batchSize = 500;

	permisos.forEach((permiso) => {
		// console.log({ i, ...permiso });

		const ref = db
			.collection("permisos")
			.doc("2020-2021")
			.collection("modulos")
			.doc(`Modulo-${permiso.modulo}`)
			.collection("permisos")
			.doc(permiso.id);

		batch.update(ref, { laboresPendientes: false });

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
