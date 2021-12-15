export const productoresReducer = (state, action) => {
	switch (action.type) {
		case "setInput":
			return { ...state, inputValue: action.payload };

		case "setSelect":
			return { ...state, campo: action.payload };

		case "setProductores":
			return { ...state, productores: action.payload };

		case "setProductorSelected":
			return { ...state, productorSelected: action.payload };

		case "openModal":
			return { ...state, openEditModal: true };

		case "closeModal":
			return { ...state, openEditModal: false, msgError: null };

		case "setError":
			return { ...state, msgError: action.payload };

		case "removeError":
			return { ...state, msgError: null };

		default:
			return state;
	}
};
