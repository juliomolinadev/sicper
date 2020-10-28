import { db, firebase, googleAuthProvider } from "../firebase/firebase-config";
import { types } from "../types/types";
import { finishLoading, startLoading } from "./ui";
import Swal from "sweetalert2";

export const startLoginEmailPassword = (email, password) => {
	return (dispatch) => {
		dispatch(startLoading());

		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				const entity = await loadEntity(user.uid);

				console.log("En actions: ", entity);

				const { entidad, claveEntidad, img } = entity;

				dispatch(login(user.uid, user.displayName));
				dispatch(setEntity(entidad, img, claveEntidad));
				dispatch(finishLoading());
			})
			.catch((e) => {
				console.log(e);
				dispatch(finishLoading());
				Swal.fire("Error", "Usuoario o contraseña incorrecto.", "error");
			});
	};
};

export const startRegisterWithEmailPasswordName = (email, password, name) => {
	return (dispatch) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				await user.updateProfile({ displayName: name });
				dispatch(login(user.uid, user.displayName));
			})
			.catch((e) => {
				console.log(e);
				Swal.fire("Error", "El usuario ya existe.", "error");
			});
	};
};

export const startGoogleLogin = () => {
	return (dispatch) => {
		firebase
			.auth()
			.signInWithPopup(googleAuthProvider)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));
			});
	};
};

export const login = (uid, displayName) => ({
	type: types.login,
	payload: {
		uid,
		displayName
	}
});

export const setEntity = (entidad, img, claveEntidad) => ({
	type: types.entity,
	payload: {
		entidad,
		img,
		claveEntidad
	}
});

export const startLogout = () => {
	return async (dispatch) => {
		await firebase.auth().signOut();
		dispatch(logout());
	};
};

export const logout = () => ({
	type: types.logout
});

export const loadEntity = async (uid) => {
	const entitySnap = await db.collection(`usuarios`).get();

	let entity = {};

	entitySnap.forEach((snapHijo) => {
		if (snapHijo.id === uid) {
			entity = { ...snapHijo.data() };
		}
	});

	return entity;
};
