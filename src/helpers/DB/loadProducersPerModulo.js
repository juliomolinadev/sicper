import { db } from "../../firebase/firebase-config";

export const loadProducersPerModulo = async (ciclo, modulo) => {
	const curps = [];
	const curpsInGroups = [];
	let index = 0;
	const permisos = await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection(`permisos`)
		.get();

	permisos.forEach((permisoSnap) => {
		const curp = permisoSnap.data().curpProductor;
		if (!curps.includes(curp)) curps.push(curp);
	});

	curps.forEach((curp) => {
		if (curpsInGroups[index]) {
			if (curpsInGroups[index].length < 10) curpsInGroups[index].push(curp);
			else {
				index++;
				curpsInGroups[index] = [curp];
			}
		} else {
			curpsInGroups[index] = [curp];
		}
	});

	return curpsInGroups;
};
