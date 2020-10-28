import { db } from "../firebase/firebase-config";

export const loadUsuarios = async (usuario, claveEntidad) => {
	const usuariosSnap = await db
		.collection(`derechos`)
		.where("modulo", "==", claveEntidad)
		.orderBy("apPaterno")
		.startAt(usuario)
		.endAt(usuario + "\uf8ff")
		.get();

	const usuarios = [];

	usuariosSnap.forEach((snapHijo) => {
		usuarios.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	return usuarios;
};
