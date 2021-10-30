import { db } from "../../firebase/firebase-config";

export const getPermitStatus = async (permiso, modulo, ciclo) => {
	const permit = await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection(`modulos`)
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.doc(permiso)
		.get();

	return permit.data().estadoPermiso;
};
