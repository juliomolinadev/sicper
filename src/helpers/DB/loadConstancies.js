import { db } from "../../firebase/firebase-config";

export const loadCostancies = async (usuario, anio) => {
	const campos = ["apPaterno", "cuenta"];
	const qryConstancies = [];
	const constancies = [];

	const constanciesRef = db.collection("constancias").doc(`${anio}`).collection("constancias");

	campos.forEach((campo) => {
		qryConstancies.push(
			constanciesRef
				.orderBy(campo)
				.startAt(usuario)
				.endAt(usuario + "\uf8ff")
				.get()
		);

		qryConstancies.push(constanciesRef.where(campo, "==", Number(usuario)).get());
	});

	const resolvedConstanciesQrys = await Promise.all(qryConstancies);

	resolvedConstanciesQrys.forEach((snap) => {
		snap.forEach((snapHijo) => {
			constancies.push({
				...snapHijo.data()
			});
		});
	});

	return constancies;
};
