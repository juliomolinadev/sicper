export const modulosCheckboxReducer = (state, action) => {
	const { unidades, modulosPorUnidad } = state;
	const { type, payload } = action;

	switch (type) {
		case "setUnidad":
			if (unidades[payload]) {
				return {
					...state,
					unidades: {
						...unidades,
						[payload]: false
					}
				};
			} else {
				const newValues = {};
				Object.keys(unidades).forEach((newValueKey) => {
					newValues[newValueKey] = false;
				});
				return {
					...state,
					unidades: {
						...newValues,
						[payload]: true
					}
				};
			}

		case "changeModulo":
			const { unidad, modulo } = payload;
			return {
				...state,
				modulosPorUnidad: {
					...modulosPorUnidad,
					[unidad]: {
						...modulosPorUnidad[unidad],
						[modulo]: !modulosPorUnidad[unidad][modulo]
					}
				}
			};

		case "changeGroup":
			const newModulosState = { ...modulosPorUnidad };
			Object.keys(state.unidades).forEach((unidad) => {
				Object.keys(state.modulosPorUnidad[unidad]).forEach((modulo) => {
					newModulosState[unidad][modulo] = state.unidades[unidad];
				});
			});

			return {
				...state,
				modulosPorUnidad: newModulosState
			};

		default:
			break;
	}
};
