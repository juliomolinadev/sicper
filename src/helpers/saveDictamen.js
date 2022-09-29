import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const saveDictamen = async (cuenta, ciclo, newDictamen) => {
	return db
		.collection(`dictamenes`)
		.doc(ciclo)
		.collection("dictamenes")
		.doc(cuenta)
		.set(newDictamen)
		.then(() => {
			Swal.fire("Dictamen Guardado", "Se registró con éxito el dictamen.", "success");

			return true;
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
			return false;
		});
};
