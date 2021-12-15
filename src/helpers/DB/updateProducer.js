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
	/*
    case 1: Cambia de tipo de persona (fisica/moral), cambia la curp o cambia id
        - Obtener modulos y permisos del productor
        - Borrar el documento
        - Crear un nuevo documento con id difernente y los datos tal cual en el formulario.
        - Actualizar datos del productor en permisos
        
    case 2: Cambia el nombre o el rfc
        - Obtener modulos y permisos del productor
        - Actualizar datos del productor en permisos
        - Actualizar documento con los datos tal cual en el formulario.
        
    case 3: Cambia cualquier otro campo 
        - Actualizar documento con los datos tal cual en el formulario.
    */

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
					const permisosRef = await getPermitsRefs(idAnterior);

					permisosRef.forEach((permiso) => {
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
					const permisosRef = await getPermitsRefs(idAnterior);

					permisosRef.forEach((permiso) => {
						transaction.update(permiso, {
							curpProductor: curp,
							idProductorSelected: id,
							nombreProductor: nombreCompleto,
							rfcProductor: rfc
						});
					});

					delete productor.id;
					transaction.update(producerRef, productor);

					return true;
				} else {
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
