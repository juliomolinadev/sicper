import { db } from "../firebase/firebase-config";

export const loadUsuarios = async (usuario, modulo) => {
	const campos = ["apPaterno", "cuenta"];
	const qryUsuarios = [];
	const usuarios = [];

	const padUsuarios = defineRef(modulo);

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
			switch (modulo) {
				case "UNI01":
				case "UNI02":
				case "UNI03":
					usuarios.push({
						id: snapHijo.id,
						entidad: modulo,
						...snapHijo.data()
					});
					break;

				default:
					if (snapHijo.data().equipo !== 1) {
						usuarios.push({
							id: snapHijo.id,
							entidad: modulo,
							...snapHijo.data()
						});
					}
					break;
			}
		});
	});
	return usuarios;
};

const defineModulo = (modulo) => {
	if (modulo === "9A") return modulo;
	else if (modulo === "9B") return modulo;
	else if (modulo === "dev") return modulo;
	else return parseInt(modulo);
};

const defineRef = (modulo) => {
	switch (modulo) {
		case "UNI01":
			return db.collection(`derechos`).where("equipo", "==", 1).where("modulo", "in", [4, 5, 6, 7]);

		case "UNI02":
			return db
				.collection(`derechos`)
				.where("equipo", "==", 1)
				.where("modulo", "in", [8, "9A", "9B"]);

		case "UNI03":
			return db.collection(`derechos`).where("equipo", "==", 1).where("modulo", "in", [1, 2, 3]);

		default:
			return db.collection(`derechos`).where("modulo", "==", defineModulo(modulo));
	}
};
