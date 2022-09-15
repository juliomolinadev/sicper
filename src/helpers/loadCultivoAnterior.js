import { db } from "../firebase/firebase-config";

export const loadCultivoAnterior = async (cuenta, modulo, ciclo) => {
	const permisos = [];
	const cultivo = {
		superficie: 0,
		nombre: "SIN CULTIVO",
		id: "",
		clave: ""
	};

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
		if (permiso.supAutorizada > cultivo.superficie) {
			cultivo.superficie = permiso.supAutorizada;
			cultivo.nombre = permiso.nombreCultivo;
			cultivo.id = permiso.idCultivoSelected;
			cultivo.clave = permiso.claveCultivo;
		}
	});

	return cultivo;
};
