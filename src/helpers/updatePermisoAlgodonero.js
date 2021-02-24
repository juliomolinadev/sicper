import { db } from "../firebase/firebase-config";

export const updatePermisoAlgodonero = (permiso, modulo, ciclo, objeto) => {
	db.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.doc(permiso)
		.update(objeto);
};
