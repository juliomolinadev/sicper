import Swal from "sweetalert2";

import { db } from "../firebase/firebase-config";
import { types } from "../types/types";
import { loadDerechos } from "../helpers/loadDerechos";
import { fileUpload } from "../helpers/fileUpload";

export const startNewDerecho = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		const newDerecho = {
			title: "",
			body: "",
			date: new Date().getTime()
		};

		const doc = await db.collection(`derechos`).add(newDerecho);

		dispatch(activeDerecho(doc.id, newDerecho));
		dispatch(addNewDerecho(doc.id, newDerecho));
	};
};

export const activeDerecho = (id, derecho) => ({
	type: types.derechosActive,
	payload: {
		id,
		...derecho
	}
});

export const addNewDerecho = (id, derecho) => ({
	type: types.derechosAddNew,
	payload: {
		id,
		...derecho
	}
});

export const startLoadingDerechos = (apPaterno, claveEntidad) => {
	return async (dispatch) => {
		const derechos = await loadDerechos(apPaterno, claveEntidad);
		dispatch(setDerechos(derechos));
	};
};

export const setDerechos = (derechos) => ({
	type: types.derechosLoad,
	payload: derechos
});

export const startSaveDerecho = (derecho) => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		if (!derecho.url) {
			delete derecho.url;
		}

		const derechoToFirestore = { ...derecho };
		delete derechoToFirestore.id;

		await db.doc(`${uid}/journal/derechos/${derecho.id}`).update(derechoToFirestore);

		dispatch(refreshDerecho(derecho.id, derechoToFirestore));
		Swal.fire("Saved", derecho.title, "success");
	};
};

export const refreshDerecho = (id, derecho) => ({
	type: types.derechosUpdated,
	payload: {
		id,
		derecho: {
			id,
			...derecho
		}
	}
});

export const startUploading = (file) => {
	return async (dispatch, getState) => {
		const { active: activeDerecho } = getState().derechos;

		Swal.fire({
			title: "Uploading...",
			text: "Please wait...",
			allowOutsideClick: false,
			onBeforeOpen: () => {
				Swal.showLoading();
			}
		});

		const fileUrl = await fileUpload(file);
		activeDerecho.url = fileUrl;

		dispatch(startSaveDerecho(activeDerecho));

		Swal.close();
	};
};

export const startDeleting = (id) => {
	return async (dispatch, getState) => {
		const uid = getState().auth.uid;
		await db.doc(`${uid}/journal/derechos/${id}`).delete();

		dispatch(deleteDerecho(id));
	};
};

export const deleteDerecho = (id) => ({
	type: types.derechosDelete,
	payload: id
});

export const derechoLogout = () => ({
	type: types.derechosLogoutCleaning
});
