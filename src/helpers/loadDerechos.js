// TODO: Borrar
// import { db } from "../firebase/firebase-config";

// export const loadDerechos = async (apPaterno) => {
// 	const derechosSnap = await db.collection(`derechos`).where("apPaterno", "==", apPaterno).get();
// 	const derechos = [];

// 	derechosSnap.forEach((snapHijo) => {
// 		derechos.push({
// 			id: snapHijo.id,
// 			...snapHijo.data()
// 		});
// 	});

// 	return derechos;
// };
