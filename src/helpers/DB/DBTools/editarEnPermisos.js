import { db } from "../../../firebase/firebase-config";

export const editarEnPermisos = async (modulo) => {
	const ciclo = "2022-2023";
	const permisosRef = db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`);

	const permisosSnap = await permisosRef.where("estadoPermiso", "==", "Cancelado").get();

	permisosSnap.forEach(async (snapHijo) => {
		permisosRef
			.doc(snapHijo.id)
			.update({
				cuotaCultivo: 0
			})
			.then(console.log("Actualizando: ", snapHijo.id));

		// if (usuario.data().ejido && usuario.data().tipoLocalidad) {
		// } else {
		// 	console.log({
		// 		modulo,
		// 		idPermiso: snapHijo.id,
		// 		idUsuario: `${cuentaSeparada[0]}-${cuentaSeparada[1]}`,
		// 		claveLocalidad: usuario.data().ejido,
		// 		tipoLocalidad: usuario.data().tipoLocalidad
		// 	});
		// }
	});
};
