import { db } from "../firebase/firebase-config";

// TODO: Implementar busqueda de usuarios de pozo particular

export const loadUsuarios = async (usuario, modulo) => {
	const campos = ["apPaterno", "cuenta"];
	const qryUsuarios = [];
	const usuarios = [];

	const padUsuarios = db.collection(`derechos`).where("modulo", "==", defineModulo(modulo));

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

	return usuarios;
};

const defineModulo = (modulo) => {
	if (modulo === "9A") return modulo;
	else if (modulo === "9B") return modulo;
	else return parseInt(modulo);
};
