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
	const permisosSnap = await db
		.collectionGroup("permisos")
		.where("claveCultivo", "==", claveCultivo)
		.where("ciclo", "==", cicloAnterior)
		.get();

	const padron = [];
	const modulos = [];

	permisosSnap.forEach((permiso) => {
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
				productor.curp === permiso.data().curpProductor &&
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

	// Guardar padron
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
};
