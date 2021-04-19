import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const saveRolePrivileges = async (role, privileges) => {
	db.collection("roles")
		.doc(role)
		.set(privileges)
		.then(() => {
			Swal.fire(`Rol: ${role}`, "Se actualizaron los privilegios con éxito !", "success");
		})
		.catch((error) => {
			console.error("Error writing document: ", error);
		});
};
