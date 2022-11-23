import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const updateProducer = async (
	productor,
	idAnterior,
	tipoPersonaAnterior,
	curpAnterior,
	nombreAnterior,
	rfcAnterior
) => {
	const { id, curp, rfc } = productor;
	const tipoPersona = productor.genoro === "MORAL" ? "MORAL" : "FISICA";
	const nombreCompleto = `${productor.apPaterno} ${productor.apMaterno} ${productor.nombre}`;

	const producerRef = db.collection("productores").doc(idAnterior);
	const newProducerRef = db.collection("productores").doc(id);

	try {
		const isSave = await db.runTransaction(async (transaction) => {
			const producer = await transaction.get(producerRef);

			if (producer.exists) {
				if (tipoPersona !== tipoPersonaAnterior || curp !== curpAnterior || id !== idAnterior) {
					//  case 1: Cambia de tipo de persona (fisica/moral), cambia la curp o cambia id
					// 		- Obtener modulos y permisos del productor
					// 		- Obtener concesiones de los padrones de cultivos
					// 		- Crear nuevos registros en los padrones de cultivos
					// 		- Borrar concesiones en los padrones de cultivos
					// 		- Actualizar datos del productor en permisos
					// 		- Borrar documento del productor
					// 		- Crear un nuevo documento con id difernente y los datos tal cual en el formulario.

					const permitsRefs = await getPermitsRefs(idAnterior);
					const { concesionesRefs, concesiones } = await getConcesionesRefs(idAnterior);

					concesiones.forEach((concesion) => {
						///padronesCultivos/2022-2023/padrones/ALFALFA/padron/ FICJ700625HBCRXR03-ALFALFA-8
						const ref = db
							.collection("padronesCultivos")
							.doc(concesion.ciclo)
							.collection("padrones")
							.doc(concesion.cultivo)
							.collection("padron")
							.doc(`${id}-${concesion.cultivo}-${concesion.modulo}`);

						transaction.set(ref, { ...concesion, curp, idProductor: id });
					});

					concesionesRefs.forEach((concesion) => {
						transaction.delete(concesion);
					});

					permitsRefs.forEach((permiso) => {
						transaction.update(permiso, {
							curpProductor: curp,
							idProductorSelected: id,
							nombreProductor: nombreCompleto,
							rfcProductor: rfc
						});
					});

					transaction.delete(producerRef);

					delete productor.id;
					transaction.set(newProducerRef, productor);

					return true;
				} else if (nombreCompleto !== nombreAnterior || rfc !== rfcAnterior) {
					// case 2: Cambia el nombre o el rfc
					// 		- Obtener modulos y permisos del productor
					// 		- Obtener concesiones de los padrones de cultivos
					// 		- Actualizar datos del productor en permisos
					// 		- Actualizar los padrones de cultivos.
					// 		- Actualizar documento con los datos tal cual en el formulario.

					const permitsRefs = await getPermitsRefs(idAnterior);
					const { concesionesRefs } = await getConcesionesRefs(idAnterior);

					permitsRefs.forEach((permiso) => {
						transaction.update(permiso, {
							curpProductor: curp,
							idProductorSelected: id,
							nombreProductor: nombreCompleto,
							rfcProductor: rfc
						});
					});

					concesionesRefs.forEach((concesion) => {
						transaction.update(concesion, {
							nombre: nombreCompleto
						});
					});

					delete productor.id;
					transaction.update(producerRef, productor);

					return true;
				} else {
					// case 3: Cambia cualquier otro campo
					// 		- Actualizar documento con los datos tal cual en el formulario.

					delete productor.id;
					transaction.update(producerRef, productor);
					return true;
				}
			} else {
				Swal.fire("El productor no existe", "...", "error");
				throw new Error("El productor no existe");
			}
		});

		if (isSave) {
			Swal.fire(
				"Productor actualizado. ",
				"Se actualizaron con éxito los datos del productor.",
				"success"
			);

			return true;
		}
	} catch (error) {
		Swal.fire("Error de conexión", "Error al intntar actualizar productor.", "error");
		console.error(error);
		return false;
	}
};

const getPermitsRefs = async (idProductor) => {
	const permisosRefs = [];

	const permisosSnap = db
		.collectionGroup("permisos")
		.where("idProductorSelected", "==", idProductor);

	await permisosSnap.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			permisosRefs.push(doc.ref);
		});
	});

	return permisosRefs;
};

const getConcesionesRefs = async (idProductor) => {
	const concesionesRefs = [];
	const concesiones = [];

	const concesionesBatch = db.collectionGroup("padron").where("idProductor", "==", idProductor);

	await concesionesBatch.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			concesionesRefs.push(doc.ref);
			concesiones.push({ ...doc.data() });
		});
	});

	return { concesionesRefs, concesiones };
};
