import { db } from "../firebase/firebase-config";

export const updatePermisoAlgodonero = async (permiso, modulo, ciclo, objeto) => {
	try {
		await db
			.collection(`permisos`)
			.doc(ciclo)
			.collection("modulos")
			.doc(`Modulo-${modulo}`)
			.collection(`permisos`)
			.doc(permiso)
			.update(objeto);

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};
