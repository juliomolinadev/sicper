import { db } from "../../firebase/firebase-config";
import firebase from "firebase/app";
import "firebase/firestore";

export const updatePermisosPorCultivo = (
	ciclo,
	modulo,
	claveCultivo,
	nombreCultivo,
	sistema,
	tipo,
	supAutorizada
) => {
	const permisosPorCultivoRef = db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisosPorCultivo`)
		.doc(`${claveCultivo}-${nombreCultivo}`);

	switch (sistema) {
		case "Gravedad":
			if (tipo === "normal") {
				permisosPorCultivoRef.update({
					numeroPermisos: firebase.firestore.FieldValue.increment(-1),
					superficie: firebase.firestore.FieldValue.increment(supAutorizada * -1),
					gravedadNormal: firebase.firestore.FieldValue.increment(supAutorizada * -1)
				});
			}

			if (tipo === "extra") {
				permisosPorCultivoRef.update({
					numeroPermisos: firebase.firestore.FieldValue.increment(-1),
					superficie: firebase.firestore.FieldValue.increment(supAutorizada * -1),
					gravedadExtra: firebase.firestore.FieldValue.increment(supAutorizada * -1)
				});
			}
			break;

		case "Pozo Federal":
			if (tipo === "normal") {
				permisosPorCultivoRef.update({
					numeroPermisos: firebase.firestore.FieldValue.increment(-1),
					superficie: firebase.firestore.FieldValue.increment(supAutorizada * -1),
					pozoNormal: firebase.firestore.FieldValue.increment(supAutorizada * -1)
				});
			}

			if (tipo === "extra") {
				permisosPorCultivoRef.update({
					numeroPermisos: firebase.firestore.FieldValue.increment(-1),
					superficie: firebase.firestore.FieldValue.increment(supAutorizada * -1),
					pozoExtra: firebase.firestore.FieldValue.increment(supAutorizada * -1)
				});
			}
			break;

		case "Pozo Particular":
			if (tipo === "normal") {
				permisosPorCultivoRef.update({
					numeroPermisos: firebase.firestore.FieldValue.increment(-1),
					superficie: firebase.firestore.FieldValue.increment(supAutorizada * -1),
					pozoParticularNormal: firebase.firestore.FieldValue.increment(supAutorizada * -1)
				});
			}

			if (tipo === "extra") {
				permisosPorCultivoRef.update({
					numeroPermisos: firebase.firestore.FieldValue.increment(-1),
					superficie: firebase.firestore.FieldValue.increment(supAutorizada * -1),
					pozoParticularExtra: firebase.firestore.FieldValue.increment(supAutorizada * -1)
				});
			}
			break;

		default:
			console.log("Sistema de riego indefinido");
			break;
	}
};
