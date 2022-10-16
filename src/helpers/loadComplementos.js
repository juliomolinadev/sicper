import { db } from "../firebase/firebase-config";

export const loadComplementos = async (idProductor, ciclo, modulo) => {
	const permisos = [];

	const permisosBatch = await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.where("idProductorSelected", "==", idProductor)
		.orderBy("nombreCultivo")
		.startAt("COMP.")
		.endAt("COMP.\uf8ff")
		.get();

	permisosBatch.forEach((permiso) => {
		if (!permiso.data().permisoVinculado && permiso.data().estadoPermiso === "activo") {
			permisos.push({
				id: permiso.id,
				...permiso.data()
			});
		}
	});

	return permisos;
};
