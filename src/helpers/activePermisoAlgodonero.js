import { db } from "../firebase/firebase-config";

export const activePermisoAlgodonero = (permiso, modulo, ciclo) => {
	db.collection(`permisos`)
		.doc(`permisosM${modulo}`)
		.collection(`ciclos`)
		.doc(ciclo)
		.collection(`permisos`)
		.doc(permiso)
		.update({ estadoPermiso: "activo" });
};
