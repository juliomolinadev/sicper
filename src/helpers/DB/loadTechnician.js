import { db } from "../../firebase/firebase-config";

export const loadTechnician = async () => {
	const technicians = [];
	const techniciansSnap = await db.collection("usuarios").where("rol", "==", "tecnicoCESVBC").get();

	techniciansSnap.forEach((doc) => {
		technicians.push({
			...doc.data(),
			id: doc.id,
			modulos: doc.data().modulos ?? [],
			localidades: doc.data().localidades ?? []
		});
	});

	return technicians;
};
