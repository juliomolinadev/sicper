import { db } from "../../firebase/firebase-config";

export const loadTechnician = async () => {
	console.log("Llamada a BD para buscrar tecnicos");
	const technicians = [];
	const techniciansSnap = await db.collection("usuarios").where("rol", "==", "tecnicoCESVBC").get();

	techniciansSnap.forEach((doc) => {
		technicians.push({
			...doc.data(),
			id: doc.id,
			modulos: doc.data().modulos ?? []
		});
	});

	return technicians;
};
