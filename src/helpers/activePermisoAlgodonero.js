import { db } from "../firebase/firebase-config";

export const activePermisoAlgodonero = (permiso, modulo) => {
	db.collection(`permisos`)
		.doc(`permisosM${modulo}`)
		.collection(`permisos`)
		.doc(permiso)
		.update({ estadoPermiso: "activo" });
};
