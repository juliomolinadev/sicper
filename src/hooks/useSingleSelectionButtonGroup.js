import { useState } from "react";

export const useSingleSelectionButtonGroup = (initialState = {}) => {
	const [values, setValues] = useState(initialState);

	const reset = () => {
		setValues(initialState);
	};

	const handleInputChange = (key) => {
		if (values[key]) {
			setValues({
				...values,
				[key]: !values[key]
			});
		} else {
			const newValues = {};
			Object.keys(values).forEach((newValueKey) => {
				newValues[newValueKey] = false;
			});
			setValues({
				...newValues,
				[key]: true
			});
		}
	};

	return [values, handleInputChange, reset];
};
