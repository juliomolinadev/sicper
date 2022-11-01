import { db } from "../firebase/firebase-config";

export const loadUltimosPermisos = async (modulo, ciclo) => {
	const usuarios = [];
	const usuariosBatch = await db.collection("usuarios").get();

	usuariosBatch.forEach((usuario) => {
		usuarios.push({
			id: usuario.id,
			displayName: usuario.data().displayName,
			email: usuario.data().email
		});
	});

	const permisos = [];
	const permisosSnap = await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.orderBy("fechaEmicion", "desc")
		.limit(20)
		.get();

	permisosSnap.forEach((snapHijo) => {
		const usuario = usuarios.find(
			(usuario) => usuario.id === snapHijo.data().solicitanteCancelacion
		);

		const permiso = {
			id: snapHijo.id,
			...snapHijo.data()
		};

		if (usuario) {
			permiso.nombreSolicitanteCancelacion = usuario.displayName;
			permiso.emailSolicitanteCancelacion = usuario.email;
		}

		permisos.push(permiso);
	});

	return permisos;
};
