import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const loadPermisosPorSeccion = async (seccion, modulo, ciclo) => {
	const permisos = [];
	const permisosSnap = await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.where("seccion", "==", parseInt(seccion))
		.where("estadoPermiso", "==", "activo")
		.orderBy("nombreCultivo")
		.get();

	permisosSnap.forEach((snapHijo) => {
		const fecha = snapHijo.data().fechaEmicion.toDate();
		const cuota = snapHijo.data().cuotaCultivo * snapHijo.data().supAutorizada;

		permisos.push({
			id: snapHijo.id,
			...snapHijo.data(),
			cuotaCultivo: cuota,
			fechaEmicion: fecha.toLocaleDateString()
		});
	});

	if (permisos.length === 0) {
		Swal.fire("No se encontraron permisos ", "...", "warning");
	}

	return permisos;
};
