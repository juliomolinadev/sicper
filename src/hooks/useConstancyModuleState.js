import { loadCostancies } from "../helpers/DB/loadConstancies";

export const useConstancyModuleState = (moduleState, setModuleState) => {
	const handleInputChange = ({ target }) => {
		setModuleState({
			...moduleState,
			usuario: target.value.toUpperCase()
		});
	};

	const clearUsuarioInput = () => {
		setModuleState({
			...moduleState,
			usuario: "",
			constancySelected: false
		});
	};

	const handleSetConstancies = async () => {
		const constancies = await loadCostancies(moduleState.usuario, "2021");
		setModuleState({ ...moduleState, constancies });
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			handleSetConstancies();
		}
	};

	const setConstancylected = (row) => {
		setModuleState({
			...moduleState,
			constancySelected: row
		});
	};

	return [
		handleInputChange,
		clearUsuarioInput,
		handleSetConstancies,
		handleKeyUp,
		setConstancylected
	];
};
