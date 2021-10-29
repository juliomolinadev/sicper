import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const simpleLoadUsers = async (palabra = 0, campo, modulo) => {
	const usuarios = [];
	const qrysUsuarios = [];

	const usuariosRef = defineRef(modulo);

	if (palabra.length === 0) qrysUsuarios.push(usuariosRef.orderBy(campo).get());
	else {
		qrysUsuarios.push(
			usuariosRef
				.orderBy(campo)
				.startAt(palabra.toUpperCase())
				.endAt(palabra.toUpperCase() + "\uf8ff")
				.get()
		);

		qrysUsuarios.push(
			usuariosRef
				.orderBy(campo)
				.startAt(palabra)
				.endAt(palabra + "\uf8ff")
				.get()
		);

		qrysUsuarios.push(usuariosRef.where(campo, "==", Number(palabra)).get());
	}

	const resolvedUsuariosQrys = await Promise.all(qrysUsuarios);

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

	if (usuarios.length === 0) {
		Swal.fire("No se encontraron usuarios ", "...", "warning");
	}
	return usuarios;
};

const defineModulo = (modulo) => {
	switch (modulo) {
		case "9A":
		case "9B":
		case "dev":
			return modulo;

		default:
			return parseInt(modulo);
	}
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
