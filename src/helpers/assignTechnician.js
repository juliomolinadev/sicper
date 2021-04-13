import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const assignTechnician = async (ciclo, modulo, localties, tecnico) => {
	const permisosRef = await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.where("localidad", "in", localties)
		.where("tecnico", "==", "sinAsignar")
		.get();

	permisosRef.forEach((snapHijo) => {
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
};
