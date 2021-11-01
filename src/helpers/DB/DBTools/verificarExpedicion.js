// Traer todos los permisos del modulo
// Crear un array con las claves de los diferentes cultivos expedidos
// Crear un array con la superficies expedidadas por cultivo
// Traer las soperficies por cultivo del modulo
// Comparar los superficies de los permisos con la de los conteos

import { db } from "../../../firebase/firebase-config";

export const verificarExpedicion = async (modulo, ciclo, actualizar) => {
	const cultivosFromPermisos = [];

	const permisosSnap = await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.where("estadoPermiso", "!=", "Cancelado")
		.get();

	const permisos = [];
	permisosSnap.forEach((snap) => {
		permisos.push(snap.data());
	});

	const conteosSnap = await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisosPorCultivo`)
		.get();

	const conteos = [];
	conteosSnap.forEach((snap) => {
		conteos.push({ id: snap.id, ...snap.data() });
	});

	const cultivos = onlyUnique(permisos, "claveCultivo");

	cultivos.forEach((cultivo) => {
		const batch = permisos.filter((permiso) => permiso.claveCultivo === cultivo);
		const cultivoData = {
			id: `${cultivo}-${batch[0].nombreCultivo}`,
			clave: cultivo,
			cultivo: batch[0].nombreCultivo,
			gravedadNormal: 0,
			numeroPermisos: 0,
			pozoNormal: 0,
			pozoParticularNormal: 0,
			superficie: 0
		};

		batch.forEach((permiso) => {
			switch (permiso.sistema) {
				case "Gravedad":
					cultivoData.gravedadNormal = cultivoData.gravedadNormal + permiso.supAutorizada;
					break;

				case "Pozo Federal":
					cultivoData.pozoNormal = cultivoData.pozoNormal + permiso.supAutorizada;
					break;

				case "Pozo Particular":
					cultivoData.pozoParticularNormal =
						cultivoData.pozoParticularNormal + permiso.supAutorizada;
					break;

				default:
					break;
			}

			cultivoData.numeroPermisos = cultivoData.numeroPermisos + 1;
			cultivoData.superficie = cultivoData.superficie + permiso.supAutorizada;
		});

		cultivosFromPermisos.push(cultivoData);
	});

	cultivosFromPermisos.forEach((cultivoPer) => {
		const cultivoCont = conteos.find((cultivo) => cultivo.id === cultivoPer.id);

		if (cultivoCont.gravedadNormal === undefined) cultivoCont.gravedadNormal = 0;
		if (cultivoCont.pozoNormal === undefined) cultivoCont.pozoNormal = 0;
		if (cultivoCont.pozoParticularNormal === undefined) cultivoCont.pozoParticularNormal = 0;

		const igualGravedad = cultivoCont.gravedadNormal === cultivoPer.gravedadNormal ? true : false;
		const igualPozo = cultivoCont.pozoNormal === cultivoPer.pozoNormal ? true : false;
		const igualPozoParticular =
			cultivoCont.pozoParticularNormal === cultivoPer.pozoParticularNormal ? true : false;
		const igualTotal = cultivoCont.superficie === cultivoPer.superficie ? true : false;
		const igualNumero = cultivoCont.numeroPermisos === cultivoPer.numeroPermisos ? true : false;

		const table = [
			{ tipo: cultivoPer.id },

			{
				tipo: "Gravedad",
				conteo: cultivoCont.gravedadNormal,
				permisos: cultivoPer.gravedadNormal,
				dif: cultivoPer.gravedadNormal - cultivoCont.gravedadNormal,
				igualdad: igualGravedad
			},
			{
				tipo: "Pozo",
				conteo: cultivoCont.pozoNormal,
				permisos: cultivoPer.pozoNormal,
				dif: cultivoPer.pozoNormal - cultivoCont.pozoNormal,
				igualdad: igualPozo
			},
			{
				tipo: "Pozo Particular",
				conteo: cultivoCont.pozoParticularNormal,
				permisos: cultivoPer.pozoParticularNormal,
				dif: cultivoPer.pozoParticularNormal - cultivoCont.pozoParticularNormal,
				igualdad: igualPozoParticular
			},
			{
				tipo: "Total",
				conteo: cultivoCont.superficie,
				permisos: cultivoPer.superficie,
				dif: cultivoPer.superficie - cultivoCont.superficie,
				igualdad: igualTotal
			},
			{
				tipo: "Numero",
				conteo: cultivoCont.numeroPermisos,
				permisos: cultivoPer.numeroPermisos,
				dif: cultivoPer.numeroPermisos - cultivoCont.numeroPermisos,
				igualdad: igualNumero
			}
		];
		if (!igualGravedad || !igualPozo || !igualPozoParticular || !igualTotal || !igualNumero) {
			console.table(table);

			if (actualizar) {
				db.collection(`permisos`)
					.doc(ciclo)
					.collection("modulos")
					.doc(`Modulo-${modulo}`)
					.collection(`permisosPorCultivo`)
					.doc(cultivoPer.id)
					.update({
						gravedadNormal: cultivoPer.gravedadNormal,
						pozoNormal: cultivoPer.pozoNormal,
						pozoParticularNormal: cultivoPer.pozoParticularNormal,
						superficie: cultivoPer.superficie,
						numeroPermisos: cultivoPer.numeroPermisos
					});
			}
		}
	});

	console.log(`Se termido de actualizar el modulo: ${modulo}`);
};

const onlyUnique = (objectsArray, key) => {
	const unique = [];
	objectsArray.forEach((element) => {
		const index = unique.indexOf(element[key]);
		if (index === -1) {
			unique.push(element[key]);
		}
	});

	unique.sort((a, b) => sortFunction(a, b));
	return unique;
};

const sortFunction = (a, b) => {
	switch (typeof a) {
		case "number":
			if (a < b) return 1;
			if (a > b) return -1;
			return 0;

		default:
			if (a > b) return 1;
			if (a < b) return -1;
			return 0;
	}
};
