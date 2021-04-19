import { db } from "../firebase/firebase-config";

export const saveNewUserRole = (role) => {
	db.collection("roles")
		.doc(role)
		.set({})
		.then(() => {
			console.log(`Se guardo rol -> ${role}`);
			return true;
		})
		.catch((e) => {
			console.log(e);
		});
};
