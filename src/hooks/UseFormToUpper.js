import { useState } from "react";

export const useFormToUpper = (initialState = {}) => {
	const [values, setValues] = useState(initialState);

	const reset = () => {
		setValues(initialState);
	};

	const handleInputChange = ({ target }) => {
		switch (target.type) {
			case "checkbox":
				setValues({
					...values,
					[target.name]: target.checked
				});

				break;

			case "number":
				setValues({
					...values,
					[target.name]: Number(target.value)
				});

				break;

			default:
				setValues({
					...values,
					[target.name]: target.value.toUpperCase()
				});
				break;
		}
	};

	const setAValue = (name, value) => {
		setValues({
			...values,
			[name]: value
		});
	};

	return [values, handleInputChange, reset, setAValue, setValues];
};
