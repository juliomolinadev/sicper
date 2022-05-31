import { db } from "../../firebase/firebase-config";

export const loadGuia = async (permiso) => {
	const guias = [];

	const guiasSnap = await db
		.collection(`guias`)
		.doc(permiso.ciclo)
		.collection(`guias`)
		.where("permiso", "==", permiso.id)
		.get();

	guiasSnap.forEach((guia) => {
		guias.push({ ...guia.data() });
	});

	if (guias.length === 0) return false;
	else return guias[0];
};
