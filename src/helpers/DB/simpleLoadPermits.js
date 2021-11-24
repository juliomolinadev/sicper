import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const simpleLoadPermits = async (
	pairs,
	modulo,
	ciclo,
	fechaInicial = new Date(2021, 8, 1),
	fechaFinal = new Date(2022, 8, 30)
) => {
	const { palabra = 0, campo } = pairs[0];
	const permisos = [];
	const permisosFiltrados = [];
	const qrysPermisos = [];
	const permisosRef = db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`);

	if (palabra.length === 0) qrysPermisos.push(permisosRef.orderBy(campo).get());
	else {
		qrysPermisos.push(
			permisosRef
				.orderBy(campo)
				.startAt(palabra.toUpperCase())
				.endAt(palabra.toUpperCase() + "\uf8ff")
				.get()
		);

		qrysPermisos.push(
			permisosRef
				.orderBy(campo)
				.startAt(palabra)
				.endAt(palabra + "\uf8ff")
				.get()
		);

		qrysPermisos.push(permisosRef.where(campo, "==", Number(palabra)).get());
	}

	const resolvedPermisosQrys = await Promise.all(qrysPermisos);

	resolvedPermisosQrys.forEach((snap) => {
		snap.forEach((snapHijo) => {
			const fecha = snapHijo.data().fechaEmicion.toDate();
			const cuota = snapHijo.data().cuotaCultivo * snapHijo.data().supAutorizada;

			if (fecha >= fechaInicial && fecha <= addDays(fechaFinal, 1)) {
				permisos.push({
					id: snapHijo.id,
					...snapHijo.data(),
					cuotaCultivo: cuota,
					fechaEmicion: fecha.toLocaleDateString()
				});
			}
		});
	});

	permisosFiltrados.push(permisos);

	if (pairs.length > 1) {
		for (let i = 1; i <= pairs.length - 1; i++) {
			const permisos = permisosFiltrados.pop();
			permisosFiltrados.push(
				permisos.filter(
					(permiso) => permiso[pairs[i].campo] === ifIsNumber(pairs[i].campo, pairs[i].palabra)
				)
			);
		}
	}

	if (permisos.length === 0) {
		Swal.fire("No se encontraron permisos ", "...", "warning");
	}

	return permisosFiltrados.pop();
};

const addDays = (date, days) => {
	let result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

const ifIsNumber = (campo, value) => {
	switch (campo) {
		case "seccion":
			return parseInt(value);

		default:
			return value;
	}
};
