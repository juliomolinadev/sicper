import { db } from "../firebase/firebase-config";

export const loadUsuarios = async (usuario) => {
	const usuariosSnap = await db
		.collection(`derechos`)
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
