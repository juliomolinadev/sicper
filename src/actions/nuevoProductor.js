import { types } from "../types/types";
import { db } from "../firebase/firebase-config";
import Swal from "sweetalert2";

export const openNuevoProductorModal = () => ({
	type: types.altaPermisoOpenNuevoProductorModal
});

export const closeNuevoProductorModal = () => ({
	type: types.altaPermisoCloseNuevoProductorModal
});

export const startSaveProductor = (productor) => {
	return (dispatch) => {
		db.collection("productores")
			.add(productor)
			.then(
				/* async ({ user }) => {
				await user.updateProfile({ displayName: name });
				dispatch(login(user.uid, user.displayName));
      } */
				(docRef) => {
					console.log(docRef.id);
				}
			)
			.catch((e) => {
				console.log(e);
				Swal.fire("Error", e, "error");
			});
	};
};
