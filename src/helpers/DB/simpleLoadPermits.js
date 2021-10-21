import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

const addDays = (date, days) => {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
};

export const simpleLoadPermits = async (
	palabra = 0,
	campo,
	modulo,
	ciclo,
	fechaInicial = new Date(2021, 8, 1),
	fechaFinal = new Date(2022, 8, 30)
) => {
	const permisos = [];
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
					cuotaCultivo: cuota
				});
			}
		});
	});

	if (permisos.length === 0) {
		Swal.fire("No se encontraron permisos ", "...", "warning");
	}
	return permisos;
};
