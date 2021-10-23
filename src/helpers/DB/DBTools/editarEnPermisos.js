import { db } from "../../../firebase/firebase-config";

export const editarEnPermisos = async (modulo) => {
	const ciclo = "2021-2022";
	const permisosRef = db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`);

	const derechosRef = db.collection("derechos");

	const permisosSnap = await permisosRef.get();

	permisosSnap.forEach(async (snapHijo) => {
		const cuentaSeparada = snapHijo.data().cuenta.split(".");
		const usuario = await derechosRef.doc(`${cuentaSeparada[0]}-${cuentaSeparada[1]}`).get();

		if (usuario.data().ejido && usuario.data().tipoLocalidad) {
			permisosRef
				.doc(snapHijo.id)
				.update({
					claveLocalidad: usuario.data().ejido,
					tipoLocalidad: usuario.data().tipoLocalidad
				})
				.then(console.log("Actualizando: ", snapHijo.id));
		} else {
			console.log({
				modulo,
				idPermiso: snapHijo.id,
				idUsuario: `${cuentaSeparada[0]}-${cuentaSeparada[1]}`,
				claveLocalidad: usuario.data().ejido,
				tipoLocalidad: usuario.data().tipoLocalidad
			});
		}
	});
};
