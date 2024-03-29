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
				const entityData = await loadEntityData(entity.claveEntidad);
				const privilegios = await loadPrivilegios(entity.rol);

				const {
					nombre,
					img,
					clave,
					dotacionGravedad,
					dotacionPozo,
					titular,
					direccion,
					expedicionActivaModulo
				} = entityData;

				dispatch(login(user.uid, user.displayName, user.email));
				dispatch(
					setEntity(
						nombre,
						img,
						clave,
						dotacionGravedad,
						dotacionPozo,
						titular,
						direccion,
						expedicionActivaModulo,
						entity.rol,
						entity.modulo
					)
				);
				dispatch(setPrivilegios(privilegios));

				const variablesGlovales = await loadVariablesGlobales();
				dispatch(setVariablesGlobales(variablesGlovales));

				dispatch(finishLoading());
			})
			.catch((e) => {
				console.log(e);
				dispatch(finishLoading());
				Swal.fire("Error", "Usuoario o contraseña incorrecto.", "error");
			});
	};
};

export const startRegisterWithEmailPasswordName = (email, password, name, modulo) => {
	return (dispatch) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(async ({ user }) => {
				await user.updateProfile({ displayName: name });
				dispatch(login(user.uid, user.displayName));
				await db.collection(`usuarios`).doc(user.uid).set({
					claveEntidad: modulo,
					modulo: modulo,
					rol: "sinAsignar",
					email: email,
					displayName: name
				});
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

export const login = (uid, displayName, email) => ({
	type: types.login,
	payload: {
		uid,
		displayName,
		email
	}
});

export const setEntity = (
	entidad,
	img,
	claveEntidad,
	dotacionGravedad,
	dotacionPozo,
	titular,
	direccion,
	expedicionActivaModulo,
	rol,
	modulo
) => ({
	type: types.entity,
	payload: {
		entidad,
		img,
		claveEntidad,
		dotacionGravedad,
		dotacionPozo,
		titular,
		direccion,
		expedicionActivaModulo,
		rol,
		modulo
	}
});

export const startSetVariablesGlobales = () => {
	return async (dispatch) => {
		const variablesGlovales = await loadVariablesGlobales();
		dispatch(setVariablesGlobales(variablesGlovales));
	};
};

export const setVariablesGlobales = (data) => ({
	type: types.setVariablesGlobales,
	payload: data
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

export const loadEntityData = async (claveEntidad) => {
	const entitySnap = await db.collection(`entidades`).get();

	let entityData = {};

	entitySnap.forEach((snapHijo) => {
		if (snapHijo.data().clave === claveEntidad) {
			entityData = { ...snapHijo.data() };
		}
	});

	return entityData;
};

export const loadPrivilegios = async (rol) => {
	const roles = await db.collection(`roles`).get();

	let privilegios = {};

	roles.forEach((snapHijo) => {
		if (snapHijo.id === rol) {
			privilegios = { ...snapHijo.data() };
		}
	});

	return privilegios;
};

export const loadVariablesGlobales = async () => {
	const roles = await db.collection(`app`).doc("variablesGlobales").get();
	return roles.data();
};

export const setPrivilegios = (privilegios) => ({
	type: types.setPrivilegios,
	payload: privilegios
});

export const loadEstadoExpedicionModulo = async (claveEntidad) => {
	const entidad = await db.collection(`entidades`).doc(`${claveEntidad}`).get();

	return entidad.data().expedicionActivaModulo;
};

export const startSetEstadoExpedicionModulo = (claveEntidad) => {
	return async (dispatch) => {
		const estadoExpedicion = await loadEstadoExpedicionModulo(claveEntidad);
		dispatch(setEstadoExpedicionModulo(estadoExpedicion));
	};
};

export const setEstadoExpedicionModulo = (estadoExpedicion) => ({
	type: types.setEstadoExpedicionModulo,
	payload: estadoExpedicion
});
