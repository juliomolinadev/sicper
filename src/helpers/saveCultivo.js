import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const saveCultivo = async (id, cultivo) => {
	try {
		await db.collection("cultivos").doc(id).set(cultivo);
		Swal.fire("Cultivo guardado.", "Se guardaron con éxito los datos del cultivo.", "success");

		return true;
	} catch (error) {
		console.log(error);
		Swal.fire("Error.", "Error al intentar guardar el cultivo.", "error");

		return false;
	}
};
