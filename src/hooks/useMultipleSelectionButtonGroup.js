import { useState } from "react";

export const useMultipleSelectionButtonGroup = (initialState = {}) => {
	const [values, setValues] = useState(initialState);

	const reset = () => {
		setValues(initialState);
	};

	const handleInputChange = (key) => {
		setValues({
			...values,
			[key]: !values[key]
		});
	};

	const handleGroupChange = (values) => {
		setValues({
			...values
		});
	};

	return [values, handleInputChange, handleGroupChange, reset];
};
