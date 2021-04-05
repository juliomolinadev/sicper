import { db } from "../firebase/firebase-config";

// TODO: Implementar busqueda de usuarios de pozo particular

export const loadUsuarios = async (usuario, modulo) => {
	const usuariosSnap = await db
		.collection(`derechos`)
		.where("modulo", "==", parseInt(modulo))
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
