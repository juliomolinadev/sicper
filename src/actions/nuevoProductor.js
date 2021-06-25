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
	return () => {
		db.collection("productores")
			.add(productor)
			.then(() => {
				console.log("Productor registrado");
				Swal.fire("Productor registrado", "Se registraron con éxito los cambios.", "success");
			})
			.catch((e) => {
				console.log(e);
				Swal.fire("Error", e, "error");
			});
	};
};
