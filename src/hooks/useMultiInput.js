import { useState } from "react";

export const useMultiInput = (initialState = []) => {
	const [values, setValues] = useState(initialState);
	const reset = () => {
		setValues(initialState);
	};

	const handleInputChange = ({ target }) => {
		const index = parseInt(target.attributes.index.nodeValue);
		const targetPair = values[index];
		const newPair = { ...targetPair, [target.name]: target.value };
		const newState = values.map((pair, i) => {
			if (i === index) return newPair;
			else return pair;
		});

		setValues(newState);
	};

	const addPair = () => {
		setValues([...values, { palabra: "", campo: "" }]);
	};

	const removePair = () => {
		const newState = values.slice(0, values.length - 1);
		setValues(newState);
	};

	return [values, handleInputChange, addPair, removePair, reset];
};
