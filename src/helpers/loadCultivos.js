import { db } from "../firebase/firebase-config";

export const loadCultivos = async (cultivo, include0) => {
	const campos = ["clave", "nombre"];
	const qrysCultivos = [];
	const cultivos = [];

	campos.forEach((campo) => {
		qrysCultivos.push(
			db
				.collection(`cultivos`)
				.orderBy(campo)
				.startAt(cultivo)
				.endAt(cultivo + "\uf8ff")
				.get()
		);

		qrysCultivos.push(db.collection(`cultivos`).where(campo, "==", Number(cultivo)).get());
	});

	const resolvedCultivosQrys = await Promise.all(qrysCultivos);

	resolvedCultivosQrys.forEach((snap) => {
		snap.forEach((snapHijo) => {
			switch (include0) {
				case "nuevo":
					if (snapHijo.data().clave !== 0) {
						cultivos.push({
							id: snapHijo.id,
							...snapHijo.data()
						});
					}

					break;

				default:
					cultivos.push({
						id: snapHijo.id,
						...snapHijo.data()
					});
					break;
			}
			if (include0) {
			}
		});
	});

	return cultivos;
};
