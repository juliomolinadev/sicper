import { useState } from "react";

export const useFormArray = (initialState = []) => {
	const [values, setValues] = useState(initialState);
	const reset = () => {
		setValues(initialState);
	};

	const handleInputChange = ({ target }) => {
		const keys = target.name.split("-");
		const index = keys[0];
		const name = keys[1];
		const newState = values.slice();

		if (target.type === "button") {
			newState[index][name] = !newState[index][name];
		} else {
			newState[index][name] = target.value;
		}
		setValues(newState);
	};

	return [values, handleInputChange, reset];
};
