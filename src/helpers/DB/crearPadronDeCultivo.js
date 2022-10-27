import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const crearPadronDeCultivo = async (ciclo, claveCultivo, nombreCultivo) => {
	Swal.fire({
		title: "Generando padrón...",
		text: "Por favor espere...",
		allowOutsideClick: false,
		didOpen: () => {
			Swal.showLoading();
		}
	});

	// Obtener el ciclo anterior
	const cicloSplit = ciclo.split("-");
	const cicloAnterior = `${Number(cicloSplit[0]) - 1}-${Number(cicloSplit[1]) - 1}`;

	// Traer todos los permisos expedidos del cultivo del ciclo anterior
	const permisosAnterioresSnap = await db
		.collectionGroup("permisos")
		.where("claveCultivo", "==", claveCultivo)
		.where("ciclo", "==", cicloAnterior)
		.where("estadoPermiso", "!=", "Cancelado")
		.get();

	const padron = [];
	const modulos = [];
	const fugitivos = [];

	// Generar padron en base a los permisos expedidos en el ciclo anterior
	permisosAnterioresSnap.forEach((permiso) => {
		const modulosIndex = modulos.findIndex((modulo) => modulo.modulo === permiso.data().modulo);

		if (modulosIndex === -1) {
			modulos.push({
				cultivo: nombreCultivo,
				modulo: permiso.data().modulo,
				ciclo,
				supConcesion: permiso.data().supAutorizada,
				supExpedida: 0
			});
		} else {
			modulos[modulosIndex].supConcesion += permiso.data().supAutorizada;
		}

		const padronIndex = padron.findIndex(
			(productor) =>
				productor.idProductor === permiso.data().idProductorSelected &&
				productor.modulo === permiso.data().modulo
		);

		if (padronIndex === -1) {
			padron.push({
				idProductor: permiso.data().idProductorSelected,
				curp: permiso.data().curpProductor,
				nombre: permiso.data().nombreProductor,
				cultivo: nombreCultivo,
				modulo: permiso.data().modulo,
				ciclo,
				supConcesion: permiso.data().supAutorizada,
				supExpedida: 0
			});
		} else {
			padron[padronIndex].supConcesion += permiso.data().supAutorizada;
		}
	});

	// Actualizar padron con los permisos expedidos en el ciclo actual
	const permisosActualesSnap = await db
		.collectionGroup("permisos")
		.where("claveCultivo", "==", claveCultivo)
		.where("ciclo", "==", ciclo)
		.where("estadoPermiso", "!=", "Cancelado")
		.get();

	permisosActualesSnap.forEach((permiso) => {
		const modulosIndex = modulos.findIndex((modulo) => modulo.modulo === permiso.data().modulo);

		if (modulosIndex === -1) {
			modulos.push({
				cultivo: nombreCultivo,
				modulo: permiso.data().modulo,
				ciclo,
				supConcesion: 0,
				supExpedida: permiso.data().supAutorizada
			});
		} else {
			modulos[modulosIndex].supExpedida += permiso.data().supAutorizada;
		}

		const padronIndex = padron.findIndex(
			(productor) =>
				productor.idProductor === permiso.data().idProductorSelected &&
				productor.modulo === permiso.data().modulo
		); // Si no se encuentra el productor quiere decir que expidio sin estar en el padron

		if (padronIndex === -1) {
			padron.push({
				idProductor: permiso.data().idProductorSelected,
				curp: permiso.data().curpProductor,
				nombre: permiso.data().nombreProductor,
				cultivo: nombreCultivo,
				modulo: permiso.data().modulo,
				ciclo,
				supConcesion: 0,
				supExpedida: permiso.data().supAutorizada
			});

			fugitivos.push({
				idProductorSelected: permiso.data().idProductorSelected,
				curpProductor: permiso.data().curpProductor,
				nombreProductor: permiso.data().nombreProductor,
				modulo: permiso.data().modulo,
				supAutorizada: permiso.data().supAutorizada,
				cuenta: permiso.data().cuenta,
				usuario: permiso.data().usuario,
				numeroPermiso: permiso.data().numeroPermiso
			});
		} else {
			padron[padronIndex].supExpedida += permiso.data().supAutorizada;
		}
	});

	console.table(fugitivos);

	if (padron.length > 0) {
		try {
			let batch = db.batch();
			let i = 1;
			const batchSize = 500;

			modulos.forEach((modulo) => {
				batch.set(
					db
						.collection("padronesCultivos")
						.doc(ciclo)
						.collection("padrones")
						.doc(nombreCultivo)
						.collection("modulos")
						.doc(`${modulo.cultivo}-${modulo.modulo}`),
					modulo
				);
			});

			batch
				.commit()
				.then(() => {
					console.log("Se termino de subir batch de modulos");
				})
				.catch((err) => {
					console.error(err);
				});

			batch = db.batch();

			padron.forEach((concesion) => {
				batch.set(
					db
						.collection("padronesCultivos")
						.doc(ciclo)
						.collection("padrones")
						.doc(nombreCultivo)
						.collection("padron")
						.doc(`${concesion.idProductor}-${concesion.cultivo}-${concesion.modulo}`), //pensar sobre cultivo
					concesion
				);

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
					console.log("Se termino de crear padron");
					Swal.close();
					Swal.fire(
						"Padrón creado",
						`Se generó padrón de productores de "${nombreCultivo}".`,
						"success"
					);
				})
				.catch((err) => {
					console.error(err);
				});

			return true;
		} catch (error) {
			Swal.close();
			Swal.fire("Error de conexión", "Error al intentar guardar los cambios.", "error");
			console.error(error);

			return false;
		}
	} else {
		Swal.close();
		Swal.fire(
			"No fue posible generar el padrón",
			"No se encontraron permisos de este cultivo expedidos el ciclo pasado.",
			"error"
		);
		return false;
	}
};
