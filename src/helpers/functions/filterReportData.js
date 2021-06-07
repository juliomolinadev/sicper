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
	supPozoPartRealizad
) => {
	ref.supGravedadProgramada = ref.supGravedadProgramada + supGravedadProgramada;
	ref.supGravedadExpedida = ref.supGravedadExpedida + supGravedadExpedida;
	ref.supGravedadRealizada = ref.supGravedadRealizada + supGravedadRealizada;
	ref.supPozoProgramada = ref.supPozoProgramada + supPozoProgramada;
	ref.supPozoExpedida = ref.supPozoExpedida + supPozoExpedida;
	ref.supPozoRealizada = ref.supPozoRealizada + supPozoRealizada;
	ref.supPozoPartProgramada = ref.supPozoPartProgramada + supPozoPartProgramada;
	ref.supPozoPartExpedida = ref.supPozoPartExpedida + supPozoPartExpedida;
	ref.supPozoPartRealizad = ref.supPozoPartRealizad + supPozoPartRealizad;
};

const filterGlobalReport = (data) => {
	Object.values(data).forEach(
		({
			subciclo,
			cultivo,
			supGravedadProgramada,
			supGravedadExpedida,
			supGravedadRealizada,
			supPozoProgramada,
			supPozoExpedida,
			supPozoRealizada,
			supPozoPartProgramada,
			supPozoPartExpedida,
			supPozoPartRealizad
		}) => {
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
					supPozoPartRealizad
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
					supPozoPartRealizad
				);
			} else {
				accumulate(
					reportData[subciclo].VARIOS,
					supGravedadProgramada,
					supGravedadExpedida,
					supGravedadRealizada,
					supPozoProgramada,
					supPozoExpedida,
					supPozoRealizada,
					supPozoPartProgramada,
					supPozoPartExpedida,
					supPozoPartRealizad
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
					supPozoPartRealizad
				);
			}
		}
	);

	return reportData;
};

export const filterReportData = (data, option) => {
	Object.keys(reportData).forEach((subciclo) => {
		Object.keys(reportData[subciclo]).forEach((cultivo) => {
			reportData[subciclo][cultivo] = { ...initialObject };
		});
	});

	switch (option) {
		case "global":
			return filterGlobalReport(data);

		// case "bcSon":
		// 	return filterBcSonReport(data);

		// case "modulos":
		// 	return filterModulosReport(data);

		default:
			return data;
	}
};
