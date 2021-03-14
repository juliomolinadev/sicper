import { types } from "../../types/types";
import { loadSuperficiesCultivos } from "../../helpers/loadSuperficiesCultivos";

export const startLoadPrincipalesCultivos = (modulo, ciclo) => {
	return async (dispatch) => {
		const principalesCultivos = await loadSuperficiesCultivos(modulo, ciclo);
		dispatch(setPrincipalesCultivos(principalesCultivos));
	};
};

export const setPrincipalesCultivos = (principalesCultivos) => ({
	type: types.setDataPrincipalesCultivos,
	payload: principalesCultivos
});

export const unsetPrincipalesCultivos = () => ({
	type: types.unsetDataPrincipalesCultivos
});
