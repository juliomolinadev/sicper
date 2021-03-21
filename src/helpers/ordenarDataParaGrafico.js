export const ordenarDataParaGrafico = (data, campo) => {
	const dataCondensada = {};

	data.forEach((element) => {
		const key = element[campo];

		if (dataCondensada[key]) {
			dataCondensada[key].superficie += element.supAutorizada;
			dataCondensada[key].numeroPermisos++;
		} else {
			dataCondensada[key] = {
				label: key,
				superficie: element.supAutorizada,
				numeroPermisos: 1
			};
		}
	});

	const arrayDataCondensada = Object.values(dataCondensada);

	arrayDataCondensada.sort((a, b) => {
		if (a.superficie < b.superficie) {
			return 1;
		}
		if (a.superficie > b.superficie) {
			return -1;
		}

		return 0;
	});

	const labels = [];
	const superficiesCultivos = [];
	const numeroPermisos = [];

	let noBarrasGrafico = 8;
	let restoSuperficie = 0;
	let restoPermisos = 0;

	arrayDataCondensada.forEach((campo) => {
		if (noBarrasGrafico >= 0) {
			labels.push(`${campo.label} (${campo.superficie}ha)`);
			superficiesCultivos.push(campo.superficie);
			numeroPermisos.push(campo.numeroPermisos);
			noBarrasGrafico--;
		} else {
			restoSuperficie += campo.superficie;
			restoPermisos += campo.numeroPermisos;
		}
	});

	labels.push(`Otros ${campo} (${restoSuperficie}ha)`);
	superficiesCultivos.push(restoSuperficie);
	numeroPermisos.push(restoPermisos);

	const dataFormateada = {
		labels: labels,
		superficiesCultivos: superficiesCultivos,
		numeroPermisos: numeroPermisos
	};

	return dataFormateada;
};
