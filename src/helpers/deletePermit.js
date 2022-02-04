import { db } from "../firebase/firebase-config";

export const deletePermit = async (id, modulo) => {
	try {
		await db
			.collection(`permisos`)
			.doc("2020-2021")
			.collection("modulos")
			.doc(`Modulo-${modulo}`)
			.collection(`permisos`)
			.doc(id)
			.delete();

		console.log("Permiso borrado: ", id);

		return true;
	} catch (error) {
		console.log(error);
	}
};
