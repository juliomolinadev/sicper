import { db } from "../firebase/firebase-config";

export const setPermisoInCancelProces = (permiso, modulo, ciclo, motivo) => {
	db.collection(`permisos`)
		.doc(ciclo)
		.collection(`modulos`)
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.doc(permiso)
		.update({ estadoPermiso: "En proceso de cancelación", motivoCancelacion: motivo });
};
