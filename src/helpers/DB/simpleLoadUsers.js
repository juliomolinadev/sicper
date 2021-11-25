import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const simpleLoadUsers = async (pairs, modulo) => {
	const { palabra = 0, campo } = pairs[0];
	const usuarios = [];
	const usuariosFiltrados = [];
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

	usuariosFiltrados.push(usuarios);

	if (pairs.length > 1) {
		for (let i = 1; i <= pairs.length - 1; i++) {
			const usuarios = usuariosFiltrados.pop();
			usuariosFiltrados.push(
				usuarios.filter(
					(usuario) => usuario[pairs[i].campo] === ifIsNumber(pairs[i].campo, pairs[i].palabra)
				)
			);
		}
	}

	if (usuarios.length === 0) {
		Swal.fire("No se encontraron usuarios ", "...", "warning");
	}

	return onlyUnique(usuariosFiltrados.pop(), "id");
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

const ifIsNumber = (campo, value) => {
	switch (campo) {
		case "seccion":
			return parseInt(value);

		default:
			return value;
	}
};

const onlyUnique = (objectsArray, key) => {
	const unique = [];
	const clearArray = [];
	objectsArray.forEach((element) => {
		const index = unique.indexOf(element[key]);
		if (index === -1) {
			unique.push(element[key]);
			clearArray.push(element);
		}
	});

	return clearArray;
};
