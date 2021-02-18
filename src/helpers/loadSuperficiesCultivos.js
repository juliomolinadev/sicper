import { db } from "../firebase/firebase-config";

export const loadSuperficiesCultivos = async (modulo, ciclo) => {
	let data = {};

	await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisosPorCultivo`)
		.orderBy("superficie", "desc")
		.get()
		.then((superficiesSnap) => {
			const superficies = [];

			superficiesSnap.forEach((snapHijo) => {
				superficies.push({
					id: snapHijo.id,
					...snapHijo.data()
				});
			});

			const labels = [];
			const superficiesCultivos = [];
			const numeroPermisos = [];
			let contador = 4;
			let restoSuperficie = 0;
			let restoPermisos = 0;

			superficies.forEach((cultivo) => {
				if (contador >= 0) {
					labels.push(`${cultivo.id} (${cultivo.superficie}ha)`);
					superficiesCultivos.push(cultivo.superficie);
					numeroPermisos.push(cultivo.numeroPermisos);
					contador--;
				} else {
					restoSuperficie = +cultivo.superficie;
					restoPermisos = +cultivo.numeroPermisos;
				}
			});

			labels.push(`Otros cultivos (${restoSuperficie}ha)`);
			superficiesCultivos.push(restoSuperficie);
			numeroPermisos.push(restoPermisos);

			data = {
				labels: labels,
				superficiesCultivos: superficiesCultivos,
				numeroPermisos: numeroPermisos
			};
		})
		.catch((e) => {
			console.log(" Error: ", e);
		});

	return data;
};
