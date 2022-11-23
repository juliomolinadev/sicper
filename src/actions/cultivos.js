import Swal from "sweetalert2";

import { types } from "../types/types";
import { loadCultivos } from "../helpers/loadCultivos";
import { db } from "../firebase/firebase-config";
import { loadCiclo } from "../helpers/DB/loadCiclo";
import { goToElement } from "../helpers/functions/assets";
import { saveCultivo } from "../helpers/saveCultivo";
import { removeError } from "./ui";
import { unsetPermisosComplemento } from "./productores";
import { hayPermisosExpedidosDelCultivo } from "../helpers/DB/hayPermisosExpedidosDelCultivo";
import { deleteCultivo } from "../helpers/deleteCultivo";

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

export const startSetCatalogoDeCultivos = () => {
	return async (dispatch) => {
		const cultivos = await loadCultivos("", "x");
		dispatch(setCultivos(cultivos));
	};
};

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

export const setProductoresAnteriores = (productores) => ({
	type: types.setProductoresAnteriores,
	payload: productores
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
		dispatch(removeError());
		dispatch(unsetPermisosComplemento());

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

export const startSaveCultivo = (cultivo) => {
	return async (dispatch, getState) => {
		const state = getState();

		const newCultivo = { ...cultivo, cultivoComplementario: Number(cultivo.cultivoComplementario) };
		delete newCultivo.id;

		if (cultivo.nuevaClave !== undefined) newCultivo.clave = cultivo.nuevaClave;
		delete newCultivo.nuevaClave;

		if (cultivo.id === "nuevoCultivo") cultivo.id = `${cultivo.nuevaClave}-${cultivo.nombre}`;

		const isSave = saveCultivo(cultivo.id, newCultivo);

		if (isSave) {
			const cultivosActualizados = state.altaPermisos.cultivos.map((cultivoInStore) => {
				if (cultivoInStore.id === cultivo.id) return cultivo;
				else return cultivoInStore;
			});

			const isInStore = cultivosActualizados.find(
				(cultivoActualizado) => cultivoActualizado.id === newCultivo.id
			);

			console.log(isInStore);
			console.log(cultivo);

			if (!isInStore) {
				console.log("Puso nuevo cultivo");
				cultivosActualizados.push(newCultivo);
			}

			dispatch(setCultivos(cultivosActualizados));
			dispatch(setCultivoSelected(newCultivo));
			dispatch(removeError());
		}
	};
};

export const startDeleteCultivo = (cultivoId) => {
	return async (dispatch) => {
		const tienePermisos = await hayPermisosExpedidosDelCultivo(cultivoId);
		if (tienePermisos) {
			Swal.fire(
				"Error.",
				"Hay permisos expedidos de este cultivo. No es posible borrar el cultivo.",
				"error"
			);
		} else {
			const isDeleted = await deleteCultivo(cultivoId);
			if (isDeleted) dispatch(removeCultivo(cultivoId));
		}
	};
};

export const removeCultivo = (idCultivo) => ({
	type: types.removeCultivo,
	payload: idCultivo
});

export const setTipoSemilla = (variedad) => ({
	type: types.setTipoSemilla,
	payload: variedad
});

export const addNuevoCultivo = () => ({
	type: types.addNuevoCultivo,
	payload: {
		id: "nuevoCultivo",
		clave: 0,
		nombre: "",
		subciclo: "",
		costoHectarea: 0,
		costoGuia: 0,
		inicioBc: "",
		finBc: "",
		inicioSonora: "",
		finSonora: ""
	}
});
