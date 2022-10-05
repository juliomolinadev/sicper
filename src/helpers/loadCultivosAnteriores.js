import { db } from "../firebase/firebase-config";

export const loadCultivosAnteriores = async (cuenta, modulo, ciclo) => {
	const permisos = [];
	const cultivos = [];

	const permisosSnap = await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.where("cuenta", "==", cuenta)
		.where("estadoPermiso", "!=", "Cancelado")
		.get();

	permisosSnap.forEach((snapHijo) => {
		permisos.push({
			id: snapHijo.id,
			...snapHijo.data()
		});
	});

	permisos.forEach((permiso) => {
		const cultivo = cultivos.find((cultivo) => cultivo.id === permiso.idCultivoSelected);
		if (cultivo === undefined)
			cultivos.push({
				superficie: permiso.supAutorizada,
				nombre: permiso.nombreCultivo,
				id: permiso.idCultivoSelected,
				clave: permiso.claveCultivo
			});
	});

	if (cultivos.length > 0) return cultivos;
	else
		return [
			{
				superficie: 0,
				nombre: "SIN CULTIVO",
				id: "",
				clave: ""
			}
		];
};
