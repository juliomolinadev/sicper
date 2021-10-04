import { useState } from "react";

export const useFormToUpper = (initialState = {}) => {
	const [values, setValues] = useState(initialState);
	const reset = () => {
		setValues(initialState);
	};

	const handleInputChange = ({ target }) => {
		if (target.type === "checkbox") {
			setValues({
				...values,
				[target.name]: target.checked
			});
		} else {
			setValues({
				...values,
				[target.name]: target.value.toUpperCase()
			});
		}
	};

	const setAValue = (value) => {
		setValues(value);
	};

	return [values, handleInputChange, reset, setAValue];
};
