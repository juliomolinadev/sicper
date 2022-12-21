import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const saveRolePrivileges = async (role, privileges, uid) => {
	const date = new Date();
	const roleRef = db.collection("roles").doc(role);
	const logRef = db
		.collection("roles")
		.doc(role)
		.collection("logs")
		.doc(`${uid}-${date.toString()}`);

	try {
		const isSave = await db.runTransaction(async (transaction) => {
			transaction.update(roleRef, privileges);
			transaction.set(logRef, privileges);
			return true;
		});

		if (isSave) {
			Swal.fire(`Rol: ${role}`, "Se actualizaron los privilegios con éxito !", "success");
		}
	} catch (error) {
		Swal.fire("Error de conexión", "Por favor intente más tarde.", "error");
		console.error(error);
	}
};
