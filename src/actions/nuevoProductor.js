import { types } from "../types/types";
import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const openNuevoProductorModal = () => ({
	type: types.altaPermisoOpenNuevoProductorModal
});

export const closeNuevoProductorModal = () => ({
	type: types.altaPermisoCloseNuevoProductorModal
});

// TODO: Comprobar que el rfc no exista
export const startSaveProductor = (productor) => {
	return (dispatch) => {
		let productorRef = db.collection("productores").doc(productor.curp);
		if (productor.genero === "MORAL") {
			productorRef = db.collection("productores").doc(`${productor.curp}-PM`);
		}

		productorRef.get().then((doc) => {
			if (doc.exists) {
				const { apPaterno, apMaterno, nombre, curp } = doc.data();
				Swal.fire(
					`El CURP ${curp} ya existe!`,
					`NOMBRE: ${apPaterno} ${apMaterno} ${nombre}`,
					"error"
				);
			} else {
				productorRef.set(productor).then(() => {
					Swal.fire("Productor registrado", "Se registró con éxito el nuevo productor.", "success");
					dispatch(closeNuevoProductorModal());
				});
			}
		});
	};
};
