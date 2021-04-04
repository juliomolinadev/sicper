import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const saveTransfer = (transfer, ciclo) => {
	db.collection("transferencias")
		.doc(ciclo)
		.collection("transferencias")
		.add(transfer)
		.then(() => {
			Swal.fire(
				"Transferencia Guardada",
				"Se registró con éxito la nueva transferencia.",
				"success"
			);
			return true;
		})
		.catch((e) => {
			console.log(e);
			Swal.fire("Error", e, "error");
		});
};
