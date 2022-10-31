import { db } from "../firebase/firebase-config";

export const denegarCancelacionDePermiso = (permiso, modulo, ciclo) => {
	try {
		db.collection(`permisos`)
			.doc(ciclo)
			.collection(`modulos`)
			.doc(`Modulo-${modulo}`)
			.collection(`permisos`)
			.doc(permiso)
			.update({
				estadoPermiso: "activo"
			});

		return true;
	} catch (error) {
		console.log(error);
		return false;
	}
};
