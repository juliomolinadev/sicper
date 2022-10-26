import { db } from "../firebase/firebase-config";

export const asignarTecnico = async (id, modulo, ciclo, uid) => {
	try {
		await db
			.collection(`permisos`)
			.doc(ciclo)
			.collection("modulos")
			.doc(`Modulo-${modulo}`)
			.collection(`permisos`)
			.doc(id)
			.update({ tecnico: uid });

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};
