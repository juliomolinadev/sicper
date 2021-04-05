import { db } from "../firebase/firebase-config";

export const loadSystemUsers = async (entidad) => {
	const usuarios = [];

	if (entidad === "dev") {
		const usuariosSnap = await db.collection(`usuarios`).orderBy("claveEntidad").get();

		usuariosSnap.forEach((snapHijo) => {
			usuarios.push({
				id: snapHijo.id,
				...snapHijo.data()
			});
		});
	}

	if (entidad === "CNA") {
		const usuariosSnap = await db
			.collection(`usuarios`)
			.where("claveEntidad", "!=", "CESVBC")
			.orderBy("claveEntidad")
			.get();

		usuariosSnap.forEach((snapHijo) => {
			usuarios.push({
				id: snapHijo.id,
				...snapHijo.data()
			});
		});
	}

	if (entidad === "CESVBC") {
		const usuariosSnap = await db
			.collection(`usuarios`)
			.where("claveEntidad", "==", "CESVBC")
			.get();

		usuariosSnap.forEach((snapHijo) => {
			usuarios.push({
				id: snapHijo.id,
				...snapHijo.data()
			});
		});
	}

	return usuarios;
};
