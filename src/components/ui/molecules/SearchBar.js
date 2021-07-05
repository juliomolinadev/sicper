import React from "react";

export const SearchBar = ({ styles, inputName, placeholder, formValues, handleInputChange }) => {
	const { localidadInForm } = formValues;

	return (
		<div className={styles.box}>
			<input
				type="text"
				className={styles.input}
				placeholder={placeholder}
				name={inputName}
				autoComplete="off"
				value={localidadInForm}
				onChange={handleInputChange}
				// onKeyUp={handleKeyUp}
			/>

			<button
				className={styles.button}
				type="button"
				// onClick={handleOpenCultivosModal}
			>
				<i className={styles.icon}></i>
			</button>
		</div>
	);
};

// const styles = {
// 	box: "d-flex",
// 	input: "form-control",
// 	button: "btn btn-outline-primary d-sm-block ml-auto",
// 	icon: "fas fa-search"
// };

// const nameInput = "Localidad";
