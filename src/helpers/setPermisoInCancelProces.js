import { db } from "../firebase/firebase-config";

export const setPermisoInCancelProces = (permiso) => {
	db.collection("permisos").doc(permiso).update({ estadoPermiso: "En proceso de cancelación" });
};
