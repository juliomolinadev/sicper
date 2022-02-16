import { db } from "../../firebase/firebase-config";
import Swal from "sweetalert2";

export const loadPermisosLabores = async (pairs) => {
	const { palabra = 0, campo } = pairs[0];
	const permisos = [];
	const tecnicos = [];
	const permisosFiltrados = [];
	const qrysPermisos = [];
	const permisosRef = db.collectionGroup("permisos").where("ciclo", "==", "2020-2021");

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

	const tecnicosSnap = await db.collection("usuarios").where("rol", "==", "tecnicoCESVBC").get();
	tecnicosSnap.forEach((doc) => {
		tecnicos.push({ id: doc.id, nombre: doc.data().displayName });
	});

	const resolvedPermisosQrys = await Promise.all(qrysPermisos);

	resolvedPermisosQrys.forEach((snap) => {
		snap.forEach((snapHijo) => {
			const tecnico = tecnicos.find((tecnico) => tecnico.id === snapHijo.data().tecnico);
			permisos.push({
				id: snapHijo.id,
				...snapHijo.data(),
				desfoliado: snapHijo.data().desfoliado ? "SI" : "NO",
				cosechado: snapHijo.data().cosechado ? "SI" : "NO",
				desvarado: snapHijo.data().desvarado ? "SI" : "NO",
				disqueado: snapHijo.data().disqueado ? "SI" : "NO",
				desarraigado: snapHijo.data().desarraigado ? "SI" : "NO",
				barbechado: snapHijo.data().barbechado ? "SI" : "NO",
				pagado: snapHijo.data().pagado ? "SI" : "NO",
				laboresPendientes: snapHijo.data().laboresPendientes ? "SI" : "NO",
				tecnico: tecnico.nombre
			});
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

	return onlyUnique(permisosFiltrados.pop(), "folio");
};

// const addDays = (date, days) => {
// 	let result = new Date(date);
// 	result.setDate(result.getDate() + days);
// 	return result;
// };

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
