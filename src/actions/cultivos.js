import { types } from "../types/types";
import { loadCultivos } from "../helpers/loadCultivos";
import { db } from "../firebase/firebase-config";
import { loadCiclo } from "../helpers/DB/loadCiclo";

export const openCultivosModal = () => ({
	type: types.altaPermisoOpenCultivosModal
});

export const closeCultivosModal = () => ({
	type: types.altaPermisoCloseCultivosModal
});

export const startLoadCultivos = (cultivo, modulo) => {
	return async (dispatch) => {
		const cultivos = await loadCultivos(cultivo);
		const cultivosConModulo = [];
		cultivos.forEach((cultivo) => {
			cultivosConModulo.push({ ...cultivo, modulo });
		});
		dispatch(setCultivos(cultivosConModulo));
	};
};

export const setCultivos = (cultivos) => ({
	type: types.loadCultivos,
	payload: cultivos
});

export const loadSuperficiePrevia = async (ciclo, modulo, cultivo) => {
	const supCultivo = await db
		.collection(`permisos`)
		.doc(ciclo)
		.collection("modulos")
		.doc(`Modulo-${modulo}`)
		.collection("permisosPorCultivo")
		.doc(cultivo)
		.get();

	const dataSup = { ...supCultivo.data() };

	const superficies = {
		gravedadNormal: dataSup.hasOwnProperty("gravedadNormal") ? dataSup.gravedadNormal : 0,
		gravedadExtra: dataSup.hasOwnProperty("gravedadExtra") ? dataSup.gravedadExtra : 0,
		pozoNormal: dataSup.hasOwnProperty("pozoNormal") ? dataSup.pozoNormal : 0,
		pozoExtra: dataSup.hasOwnProperty("pozoExtra") ? dataSup.pozoExtra : 0
	};

	return superficies;
};

export const startSetCultivoSelected = (cultivo) => {
	return async (dispatch) => {
		const ciclo = await loadCiclo();
		const superficiePrevia = await loadSuperficiePrevia(
			ciclo,
			cultivo.modulo,
			`${cultivo.clave}-${cultivo.nombre}`
		);

		dispatch(setCultivoSelected({ ...cultivo, superficiePrevia }));
	};
};

export const setCultivoSelected = (cultivo) => ({
	type: types.setCultivo,
	payload: cultivo
});

export const unsetCultivoSelected = () => ({
	type: types.unsetCultivo
});
