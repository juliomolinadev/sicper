import { db } from "../firebase/firebase-config";

// TODO: Implementar busqueda de usuarios de pozo particular

export const loadUsuarios = async (usuario, modulo) => {
	const campos = ["apPaterno", "cuenta"];
	const qryUsuarios = [];
	const usuarios = [];
	// const reacomodos = [];
	// const qryReacomodos = [];

	const padUsuarios = db.collection(`derechos`).where("modulo", "==", parseInt(modulo));

	campos.forEach((campo) => {
		qryUsuarios.push(
			padUsuarios
				.orderBy(campo)
				.startAt(usuario)
				.endAt(usuario + "\uf8ff")
				.get()
		);

		qryUsuarios.push(padUsuarios.where(campo, "==", Number(usuario)).get());
	});

	const resolvedUsuariosQrys = await Promise.all(qryUsuarios);

	resolvedUsuariosQrys.forEach((snap) => {
		snap.forEach((snapHijo) => {
			if (snapHijo.data().equipo !== 1) {
				usuarios.push({
					id: snapHijo.id,
					...snapHijo.data()
				});
			}
		});
	});

	// usuarios.forEach((usuario) => {
	// 	qryReacomodos.push(db.collection(`reacomodos`).doc(usuario.id).get());
	// });

	// const resolvedReacomodosQrys = await Promise.all(qryReacomodos);

	// resolvedReacomodosQrys.forEach((reacomodo) => {
	// 	if (reacomodo.data()) {
	// 		reacomodos.push({
	// 			id: reacomodo.id,
	// 			...reacomodo.data()
	// 		});
	// 	}
	// });

	// usuarios.forEach((usuario, i) => {
	// 	const reacomodo = reacomodos.find((reacomodo) => reacomodo.id === usuario.id);
	// 	if (reacomodo) {
	// 		usuarios[i].reacomodo = reacomodo.reacomodo;
	// 	}
	// });

	return usuarios;
};
