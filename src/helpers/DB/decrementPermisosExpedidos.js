import { db } from "../../firebase/firebase-config";
import firebase from "firebase/app";
import "firebase/firestore";

export const decrementPermisosExpedidos = (ciclo, modulo, supAutorizada) => {
	db.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.update({
			// numeroPermisosModulo: firebase.firestore.FieldValue.increment(-1),
			superficieModulo: firebase.firestore.FieldValue.increment(supAutorizada * -1)
		});
};
