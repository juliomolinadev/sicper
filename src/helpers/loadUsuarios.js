import { db } from "../firebase/firebase-config";

// TODO: Implementar busqueda de usuarios de pozo particular

export const loadUsuarios = async (usuario, modulo) => {
	const campos = ["apPaterno", "cuenta"];
	const qryPromises = [];
	const usuarios = [];

	const pad = db.collection(`derechos`).where("modulo", "==", parseInt(modulo));

	campos.forEach((campo) => {
		qryPromises.push(
			pad
				.orderBy(campo)
				.startAt(usuario)
				.endAt(usuario + "\uf8ff")
				.get()
		);

		qryPromises.push(pad.where(campo, "==", Number(usuario)).get());
	});

	const resolvedQrys = await Promise.all(qryPromises);

	resolvedQrys.forEach((snap) => {
		snap.forEach((snapHijo) => {
			usuarios.push({
				id: snapHijo.id,
				...snapHijo.data()
			});
		});
	});

	// const usuariosSnap = await db
	// 	.collection(`derechos`)
	// 	.where("modulo", "==", parseInt(modulo))
	// 	.orderBy("apPaterno")
	// 	.startAt(usuario)
	// 	.endAt(usuario + "\uf8ff")
	// 	.get();

	// const usuarios = [];

	// usuariosSnap.forEach((snapHijo) => {
	// 	usuarios.push({
	// 		id: snapHijo.id,
	// 		...snapHijo.data()
	// 	});
	// });

	return usuarios;
};
