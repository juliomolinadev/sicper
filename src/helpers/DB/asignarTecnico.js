import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const asignarTecnico = (modulo, folio, tecnico) => {
	db.collection("permisos")
		.doc("2020-2021")
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection("permisos")
		.doc(folio)
		.update({ tecnico })
		.then(() => {
			Swal.fire(
				"Técnico asignado",
				`Se aplicaron los cambios en la asignación de predios. `,
				"success"
			);
		})
		.catch((error) => {
			console.log(error);
		});
};
