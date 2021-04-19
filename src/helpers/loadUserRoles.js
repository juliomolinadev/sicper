import { db } from "../firebase/firebase-config";

export const loadUserRoles = async () => {
	const roles = [];

	const rolesSnap = await db.collection(`roles`).get();

	rolesSnap.forEach((snapHijo) => {
		roles.push(snapHijo.id);
	});

	return roles;
};
