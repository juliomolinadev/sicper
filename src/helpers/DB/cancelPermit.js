import { db } from "../../firebase/firebase-config";

export const cancelPermit = (permiso, modulo, ciclo, fecha, uid) => {
	db.collection(`permisos`)
		.doc(ciclo)
		.collection(`modulos`)
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.doc(permiso)
		.update({ estadoPermiso: "Cancelado", fechaCancelacion: fecha, apruebaCancelacion: uid });
};
