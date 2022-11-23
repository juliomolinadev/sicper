import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const deleteCultivo = async (id) => {
	try {
		await db.collection("cultivos").doc(id).delete();
		Swal.fire("Cultivo eliminado.", "El cultivo fue borrado del catálogo de cultivos.", "success");

		return true;
	} catch (error) {
		console.log(error);
		Swal.fire("Error.", "Error al intentar borrar el cultivo.", "error");

		return false;
	}
};
