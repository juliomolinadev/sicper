import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const loadPermisos = async (
	palabra,
	modulo,
	ciclo,
	campos = ["usuario", "cuenta", "numeroPermiso"],
	estado = "todos",
	tipo = "todos",
	sistema = "todos"
) => {
	const permisos = [];
	const permisosCampo = [];

	const pad = db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`);

	let filtros = pad;

	if (estado !== "todos") filtros = filtros.where("estadoPermiso", "==", estado);
	if (tipo !== "todos") filtros = filtros.where("tipo", "==", tipo);
	if (sistema !== "todos") filtros = filtros.where("sistema", "==", sistema);

	campos.forEach((campo) => {
		permisosCampo.push(
			filtros
				.orderBy(`${campo}`)
				.startAt(palabra.toUpperCase())
				.endAt(palabra.toUpperCase() + "\uf8ff")
				.get()
		);
	});

	const permisosResueltos = await Promise.all(permisosCampo);

	for (let i = 0; i < permisosResueltos.length; i++) {
		permisosResueltos[i].forEach((snapHijo) => {
			permisos.push({
				id: snapHijo.id,
				...snapHijo.data()
			});
		});
	}

	if (permisos.length === 0) {
		Swal.fire(
			"No se encontraron permisos ",
			"Se mostrarán los últimos permisos registrados.",
			"warning"
		);
	}
	return permisos;
};
