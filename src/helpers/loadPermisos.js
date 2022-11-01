import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

export const loadPermisos = async (
	palabra,
	modulo,
	ciclo,
	campos = ["nombreCultivo", "usuario", "cuenta", "numeroPermiso"],
	estado = "todos",
	tipo = "todos",
	sistema = "todos",
	fechaInicial, //TODO: poner fechas segun ciclo
	fechaFinal
) => {
	const cicloSplit = ciclo.split("-");

	const fechaInicialBusqueda = fechaInicial ?? new Date(cicloSplit[0], 8, 1);
	const fechaFinalBusqueda = fechaFinal ?? new Date(cicloSplit[1], 8, 30);

	const usuarios = [];
	const usuariosBatch = await db.collection("usuarios").get();

	usuariosBatch.forEach((usuario) => {
		usuarios.push({
			id: usuario.id,
			displayName: usuario.data().displayName,
			email: usuario.data().email
		});
	});

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
	if (sistema !== "todos") {
		switch (sistema) {
			case "Gravedad":
				filtros = filtros.where("sistema", "==", sistema);
				break;

			case "Pozo":
				filtros = filtros.where("sistema", "in", ["Pozo Particular", "Pozo Federal"]);
				break;

			default:
				break;
		}
	}

	campos.forEach((campo) => {
		permisosCampo.push(
			filtros
				.orderBy(campo)
				.startAt(palabra.toUpperCase())
				.endAt(palabra.toUpperCase() + "\uf8ff")
				.get()
		);
	});

	const permisosResueltos = await Promise.all(permisosCampo);

	for (let i = 0; i < permisosResueltos.length; i++) {
		permisosResueltos[i].forEach((snapHijo) => {
			const fecha = snapHijo.data().fechaEmicion.toDate();

			if (fecha >= fechaInicialBusqueda && fecha <= addDays(fechaFinalBusqueda, 1)) {
				const usuario = usuarios.find(
					(usuario) => usuario.id === snapHijo.data().solicitanteCancelacion
				);

				const permiso = {
					id: snapHijo.id,
					...snapHijo.data()
				};

				if (usuario) {
					permiso.nombreSolicitanteCancelacion = usuario.displayName;
					permiso.emailSolicitanteCancelacion = usuario.email;
				}

				permisos.push(permiso);
			}
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
