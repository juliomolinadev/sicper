import { db } from "../firebase/firebase-config";

export const deleteUserRole = async (role) => {
	db.collection("roles")
		.doc(role)
		.delete()
		.then(() => {
			console.log(`Rol de usuario borrado (${role})`);
		})
		.catch((error) => {
			console.error("Error removing document: ", error);
		});
};
