let mergedData = {};

const plantillaRegistro = {
	cultivo: "",
	modulo: "",
	subciclo: "",
	estado: "",
	supGravedadProgramada: 0,
	supGravedadExpedida: 0,
	supGravedadRealizada: 0,
	supPozoProgramada: 0,
	supPozoExpedida: 0,
	supPozoRealizada: 0,
	supPozoPartProgramada: 0,
	supPozoPartExpedida: 0,
	supPozoPartRealizada: 0
};

const updateExpedicionItem = ({
	id,
	modulo,
	gravedadNormal = 0,
	gravedadExtra = 0,
	pozoNormal = 0,
	pozoExtra = 0,
	pozoParticularNormal = 0,
	pozoParticularExtra = 0
}) => {
	mergedData[`${id}-${modulo}`] = {
		...mergedData[`${id}-${modulo}`],
		supGravedadExpedida:
			mergedData[`${id}-${modulo}`].supGravedadExpedida + gravedadNormal + gravedadExtra,
		supPozoExpedida: mergedData[`${id}-${modulo}`].supPozoExpedida + pozoNormal + pozoExtra,
		supPozoPartExpedida:
			mergedData[`${id}-${modulo}`].supPozoPartExpedida + pozoParticularNormal + pozoParticularExtra
	};
};

const createNewAutorizadosItem = ({
	id,
	modulo,
	subciclo,
	estado = "",
	gravedadExtraAutorizada = 0,
	gravedadNormalAutorizada = 0,
	pozoExtraAutorizada = 0,
	pozoNormalAutorizada = 0
}) => {
	if (subciclo === "PERENES") subciclo = "PERENNES";
	if (isPozoParticular(modulo)) {
		mergedData[`${id}-${modulo}`] = {
			...plantillaRegistro,
			cultivo: id,
			modulo,
			subciclo,
			estado,
			supGravedadProgramada: gravedadNormalAutorizada + gravedadExtraAutorizada,
			supPozoPartProgramada: pozoNormalAutorizada + pozoExtraAutorizada
		};
	} else {
		mergedData[`${id}-${modulo}`] = {
			...plantillaRegistro,
			cultivo: id,
			modulo,
			subciclo,
			estado,
			supGravedadProgramada: gravedadNormalAutorizada + gravedadExtraAutorizada,
			supPozoProgramada: pozoNormalAutorizada + pozoExtraAutorizada
		};
	}
};

export const mergeReportData = (autorizados, expedicion) => {
	mergedData = {};
	autorizados.forEach((item) => {
		createNewAutorizadosItem(item);
	});

	expedicion.forEach((item) => {
		mergedData[`${item.id}-${item.modulo}`] && updateExpedicionItem(item);
	});

	return mergedData;
};

const isPozoParticular = (modulo) => {
	switch (modulo) {
		case "UNI01":
		case "UNI02":
		case "UNI03":
			return true;

		default:
			return false;
	}
};
