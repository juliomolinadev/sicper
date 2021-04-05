import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const updateSystemUser = (userUid, rol) => {
	db.collection(`usuarios`)
		.doc(userUid)
		.update({ rol: rol })
		.then(() => {
			Swal.fire("Usuario habilitado", `Se asignó correctamente el rol de usuario`, "success");
			return true;
		})
		.catch((e) => {
			console.log(e);
			Swal.fire("Error", e, "error");
		});
};
