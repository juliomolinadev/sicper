import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const sabeAutorizados = async (modulo, autorizados) => {
	autorizados.forEach((autorizado) => {
		db.collection("autorizados")
			.doc(`autorizadosM${modulo}`)
			.collection(`autorizados`)
			.doc(`${autorizado.cultivo}`)
			.set({
				cultivo: autorizado.cultivo,
				normal: autorizado.normal,
				extra: autorizado.extra,
				disponible: autorizado.disponible
			})
			.then(function () {
				console.log("Document successfully written!");
			})
			.catch(function (error) {
				console.error("Error writing document: ", error);
			});
	});

	Swal.fire("Autorizados Guardados", "Se registró con éxito el nuevo permiso de riego.", "success");
};
