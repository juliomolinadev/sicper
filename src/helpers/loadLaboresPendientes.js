import { db } from "../firebase/firebase-config";

export const loadLaboresPendientes = async (cuenta, modulo, cicloAnterior) => {
	let laboresPendientes = false;
	let superficieParcialLiberada = 0;

	const cicloSplit = cicloAnterior.split("-");
	const ciclos = [];
	let anioInicio = 2020;
	let anioFin = 2021;
	do {
		ciclos.push(`${anioInicio}-${anioFin}`);
		anioInicio++;
		anioFin++;
	} while (anioInicio <= Number(cicloSplit[0]));

	const permisosPromises = [];

	ciclos.forEach((ciclo) => {
		permisosPromises.push(
			db
				.collection(`permisos`)
				.doc(ciclo)
				.collection("modulos")
				.doc(`Modulo-${modulo}`)
				.collection(`permisos`)
				.where("cuenta", "==", cuenta)
				.where("estadoPermiso", "!=", "Cancelado")
				.get()
		);
	});

	const permisosResolbed = await Promise.all(permisosPromises);

	permisosResolbed.forEach((batch) => {
		batch.forEach((permiso) => {
			if (permiso.data().laboresPendientes === true) laboresPendientes = true;
			if (permiso.data().superficieParcialLiberada)
				superficieParcialLiberada += permiso.data().superficieParcialLiberada;
		});
	});

	return { laboresPendientes, superficieParcialLiberada };
};
