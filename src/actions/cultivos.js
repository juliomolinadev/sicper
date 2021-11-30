import { types } from "../types/types";
import { loadCultivos } from "../helpers/loadCultivos";
import { db } from "../firebase/firebase-config";
import { loadCiclo } from "../helpers/DB/loadCiclo";
import { goToElement } from "../helpers/functions/assets";

export const openCultivosModal = () => ({
	type: types.altaPermisoOpenCultivosModal
});

export const closeCultivosModal = () => ({
	type: types.altaPermisoCloseCultivosModal
});

export const openCultivoAnteriorModal = () => ({
	type: types.altaPermisoOpenCultivoAnteriorModal
});

export const closeCultivoAnteriorModal = () => ({
	type: types.altaPermisoCloseCultivoAnteriorModal
});

export const startLoadCultivos = (cultivo, modulo) => {
	return async (dispatch) => {
		const cultivos = await loadCultivos(cultivo, "nuevo");
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

export const startLoadCultivosAnteriores = (cultivo) => {
	return async (dispatch) => {
		const cultivos = await loadCultivos(cultivo, "anterior");
		dispatch(setCultivosAnteriores(cultivos));
	};
};

export const setCultivosAnteriores = (cultivos) => ({
	type: types.setCultivosAnteriores,
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
		pozoExtra: dataSup.hasOwnProperty("pozoExtra") ? dataSup.pozoExtra : 0,
		pozoParticularNormal: dataSup.hasOwnProperty("pozoParticularNormal")
			? dataSup.pozoParticularNormal
			: 0,
		pozoParticularExtra: dataSup.hasOwnProperty("pozoParticularExtra")
			? dataSup.pozoParticularExtra
			: 0
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
		goToElement("superficieInput");
	};
};

export const setCultivoSelected = (cultivo) => ({
	type: types.setCultivo,
	payload: cultivo
});

export const unsetCultivoSelected = () => ({
	type: types.unsetCultivo
});

export const setCultivoAnteriorSelected = (cultivo) => {
	goToElement("productorInput");
	return {
		type: types.setCultivoAnterior,
		payload: cultivo
	};
};

export const unsetCultivoAnteriorSelected = () => ({
	type: types.unsetCultivoAnterior
});
