import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const sabeAutorizados = (modulo, autorizados) => {
	autorizados.forEach(async (autorizado) => {
		const totalCultivo =
			autorizado.normalGravedad +
			autorizado.extraGravedad +
			autorizado.normalPozoFederal +
			autorizado.extraPozoFederal +
			autorizado.normalPozoParticular +
			autorizado.extraPozoParticular;

		await db
			.collection("autorizados")
			.doc(`autorizadosM${modulo}`)
			.collection(`autorizados`)
			.doc(`${autorizado.clave}-${autorizado.cultivo}`)
			.set({
				clave: autorizado.clave,
				cultivo: autorizado.cultivo,
				superficieTotal: totalCultivo,
				normalGravedad: autorizado.normalGravedad,
				extraGravedad: autorizado.extraGravedad,
				asignadaGravedad: autorizado.asignadaGravedad,
				normalPozoFederal: autorizado.normalPozoFederal,
				extraPozoFederal: autorizado.extraPozoFederal,
				asignadaPozoFederal: autorizado.asignadaPozoFederal,
				normalPozoParticular: autorizado.normalPozoParticular,
				extraPozoParticular: autorizado.extraPozoParticular,
				asignadaPozoParticular: autorizado.asignadaPozoParticular
			})
			.then(function () {
				console.log("Document successfully written!");
			})
			.catch(function (error) {
				console.error("Error writing document: ", error);
			});
	});

	Swal.fire("Autorizados Guardados", "Se registraron con éxito los cambios.", "success");
	return true;
};
