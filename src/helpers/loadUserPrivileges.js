import { db } from "../firebase/firebase-config";

export const loadUserPrivileges = async (role) => {
	const privileges = await db.collection(`roles`).doc(role).get();

	return privileges.data();
};
