import { db } from "../../firebase/firebase-config";

export const cancelPermit = async (permiso, modulo, ciclo, fecha, uid) => {
	db.collection(`permisos`)
		.doc(ciclo)
		.collection(`modulos`)
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.doc(permiso)
		.update({
			estadoPermiso: "Cancelado",
			cuotaCultivo: 0,
			fechaCancelacion: fecha,
			apruebaCancelacion: uid
		});

	// try {
	// 	const permisoRef = db
	// 		.collection(`permisos`)
	// 		.doc(ciclo)
	// 		.collection(`modulos`)
	// 		.doc(`Modulo-${modulo}`)
	// 		.collection(`permisos`);

	// 	const isSave = await db.runTransaction(async (transaction) => {

	// 	});
	// } catch (error) {
	// 	Swal.fire("Error de conexión", "Por favor intente más tarde.", "error");
	// 	console.error(error);
	// 	return false;
	// }
};
