import { cultivosPrincipales as cultivos } from "../consts";

const initialObject = {
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
const reportData = { ...cultivos };

const accumulate = (
	ref,
	supGravedadProgramada,
	supGravedadExpedida,
	supGravedadRealizada,
	supPozoProgramada,
	supPozoExpedida,
	supPozoRealizada,
	supPozoPartProgramada,
	supPozoPartExpedida,
	supPozoPartRealizada
) => {
	ref.supGravedadProgramada = ref.supGravedadProgramada + supGravedadProgramada;
	ref.supGravedadExpedida = ref.supGravedadExpedida + supGravedadExpedida;
	ref.supGravedadRealizada = ref.supGravedadRealizada + supGravedadRealizada;
	ref.supPozoProgramada = ref.supPozoProgramada + supPozoProgramada;
	ref.supPozoExpedida = ref.supPozoExpedida + supPozoExpedida;
	ref.supPozoRealizada = ref.supPozoRealizada + supPozoRealizada;
	ref.supPozoPartProgramada = ref.supPozoPartProgramada + supPozoPartProgramada;
	ref.supPozoPartExpedida = ref.supPozoPartExpedida + supPozoPartExpedida;
	ref.supPozoPartRealizada = ref.supPozoPartRealizada + supPozoPartRealizada;
};

const checkModulo = (modulos, modulo) => {
	let isOk = false;

	if (modulos.length > 0) {
		modulos.forEach((okModulo) => {
			if (modulo.toString() === okModulo) isOk = true;
		});
	} else isOk = true;

	return isOk;
};

const isRegisterInclude = (opcion, modulos, modulo, estado) => {
	switch (opcion) {
		case "modulos":
		case "modulo":
			return checkModulo(modulos, modulo);

		case "Baja California":
		case "Sonora":
			if (opcion === estado) {
				return true;
			} else return false;

		case "global":
			return true;

		default:
			return false;
	}
};

export const filterReportData = (data, option, modulos) => {
	Object.keys(reportData).forEach((subciclo) => {
		Object.keys(reportData[subciclo]).forEach((cultivo) => {
			reportData[subciclo][cultivo] = { ...initialObject };
		});
	});

	Object.values(data).forEach(
		({
			subciclo,
			cultivo,
			modulo,
			estado,
			supGravedadProgramada,
			supGravedadExpedida,
			supGravedadRealizada,
			supPozoProgramada,
			supPozoExpedida,
			supPozoRealizada,
			supPozoPartProgramada,
			supPozoPartExpedida,
			supPozoPartRealizada
		}) => {
			if (isRegisterInclude(option, modulos, modulo, estado)) {
				if (reportData[subciclo][cultivo]) {
					accumulate(
						reportData[subciclo][cultivo],
						supGravedadProgramada,
						supGravedadExpedida,
						supGravedadRealizada,
						supPozoProgramada,
						supPozoExpedida,
						supPozoRealizada,
						supPozoPartProgramada,
						supPozoPartExpedida,
						supPozoPartRealizada
					);

					accumulate(
						reportData[subciclo].SUBTOTAL,
						supGravedadProgramada,
						supGravedadExpedida,
						supGravedadRealizada,
						supPozoProgramada,
						supPozoExpedida,
						supPozoRealizada,
						supPozoPartProgramada,
						supPozoPartExpedida,
						supPozoPartRealizada
					);
				} else {
					accumulate(
						getRef(reportData, subciclo),
						supGravedadProgramada,
						supGravedadExpedida,
						supGravedadRealizada,
						supPozoProgramada,
						supPozoExpedida,
						supPozoRealizada,
						supPozoPartProgramada,
						supPozoPartExpedida,
						supPozoPartRealizada
					);

					accumulate(
						reportData[subciclo].SUBTOTAL,
						supGravedadProgramada,
						supGravedadExpedida,
						supGravedadRealizada,
						supPozoProgramada,
						supPozoExpedida,
						supPozoRealizada,
						supPozoPartProgramada,
						supPozoPartExpedida,
						supPozoPartRealizada
					);
				}
			}
		}
	);

	if (reportData.TOTAL) {
		delete reportData.TOTAL;
	}

	const TOTAL = {
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

	Object.values(reportData).forEach((subciclo) => {
		TOTAL.supGravedadProgramada =
			TOTAL.supGravedadProgramada + subciclo.SUBTOTAL.supGravedadProgramada;
		TOTAL.supGravedadExpedida = TOTAL.supGravedadExpedida + subciclo.SUBTOTAL.supGravedadExpedida;
		TOTAL.supGravedadRealizada =
			TOTAL.supGravedadRealizada + subciclo.SUBTOTAL.supGravedadRealizada;
		TOTAL.supPozoProgramada = TOTAL.supPozoProgramada + subciclo.SUBTOTAL.supPozoProgramada;
		TOTAL.supPozoExpedida = TOTAL.supPozoExpedida + subciclo.SUBTOTAL.supPozoExpedida;
		TOTAL.supPozoRealizada = TOTAL.supPozoRealizada + subciclo.SUBTOTAL.supPozoRealizada;
		TOTAL.supPozoPartProgramada =
			TOTAL.supPozoPartProgramada + subciclo.SUBTOTAL.supPozoPartProgramada;
		TOTAL.supPozoPartExpedida = TOTAL.supPozoPartExpedida + subciclo.SUBTOTAL.supPozoPartExpedida;
		TOTAL.supPozoPartRealizada =
			TOTAL.supPozoPartRealizada + subciclo.SUBTOTAL.supPozoPartRealizada;
	});

	reportData.TOTAL = {};
	reportData.TOTAL.TOTAL = { ...TOTAL };

	return reportData;
};

const getRef = (ref, subciclo) => {
	switch (subciclo) {
		case "OTOÑO-INVIERNO":
			return ref[subciclo].VARIOS_OI;
		case "PERENNES":
			return ref[subciclo].VARIOS_PERENNES;
		case "PRIMAVERA-VERANO":
			return ref[subciclo].VARIOS_PV;

		default:
			return "";
	}
};
