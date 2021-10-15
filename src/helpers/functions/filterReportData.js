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
	supPozoPartExpedida
	// supPozoPartRealizad
) => {
	ref.supGravedadProgramada = ref.supGravedadProgramada + supGravedadProgramada;
	ref.supGravedadExpedida = ref.supGravedadExpedida + supGravedadExpedida;
	ref.supGravedadRealizada = ref.supGravedadRealizada + supGravedadRealizada;
	ref.supPozoProgramada = ref.supPozoProgramada + supPozoProgramada;
	ref.supPozoExpedida = ref.supPozoExpedida + supPozoExpedida;
	ref.supPozoRealizada = ref.supPozoRealizada + supPozoRealizada;
	ref.supPozoPartProgramada = ref.supPozoPartProgramada + supPozoPartProgramada;
	ref.supPozoPartExpedida = ref.supPozoPartExpedida + supPozoPartExpedida;
	// ref.supPozoPartRealizad = ref.supPozoPartRealizad + supPozoPartRealizad;
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
			supPozoPartExpedida
			// supPozoPartRealizad
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
						supPozoPartExpedida
						// supPozoPartRealizad
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
						supPozoPartExpedida
						// supPozoPartRealizad
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
						supPozoPartExpedida
						// supPozoPartRealizad
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
						supPozoPartExpedida
						// supPozoPartRealizad
					);
				}
			}
		}
	);

	return reportData;
};
