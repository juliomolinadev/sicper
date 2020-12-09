import { db } from "../firebase/firebase-config";

export const setPermisoInCancelProces = (permiso, modulo) => {
	db.collection(`permisos`)
		.doc(`permisosM${modulo}`)
		.collection(`permisos`)
		.doc(permiso)
		.update({ estadoPermiso: "En proceso de cancelación" });
};
