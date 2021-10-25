import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const simpleLoadUsers = async (palabra = 0, campo, modulo) => {
	const usuarios = [];
	const qrysUsuarios = [];

	const getModulo = (modulo) => {
		switch (modulo) {
			case "9A":
			case "9B":
			case "dev":
				return modulo;

			default:
				return parseInt(modulo);
		}
	};

	const usuariosRef = db.collection(`derechos`).where("modulo", "==", getModulo(modulo));

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
			usuarios.push({
				id: snapHijo.id,
				...snapHijo.data()
			});
		});
	});

	if (usuarios.length === 0) {
		Swal.fire("No se encontraron usuarios ", "...", "warning");
	}
	return usuarios;
};
