import { db } from "../firebase/firebase-config";

export const loadCultivosYProductoresAnteriores = async (cuenta, modulo, ciclo) => {
	const permisos = [];
	const cultivos = [];
	const productores = [];

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

		const productor = productores.find((productor) => productor.id === permiso.idProductorSelected);
		if (productor === undefined)
			productores.push({
				id: permiso.idProductorSelected,
				curp: permiso.curpProductor,
				nombre: permiso.nombreProductor
			});
	});

	if (cultivos.length === 0) {
		cultivos.push({
			superficie: 0,
			nombre: "SIN CULTIVO",
			id: "",
			clave: ""
		});
	}

	if (productores.length === 0) {
		productores.push({
			id: "",
			curp: "",
			nombre: "SIN PRODUTOR"
		});
	}

	return [cultivos, productores];
};
