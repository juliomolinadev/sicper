import React from "react";

export const SearchBar = ({ styles, inputName, placeholder, formValues, handleInputChange }) => {
	const { localidad } = formValues;

	return (
		<div className={styles.box}>
			<input
				type="text"
				className={styles.input}
				placeholder={placeholder}
				name={inputName}
				autoComplete="off"
				value={localidad}
				onChange={handleInputChange}
			/>

			<button className={styles.button} type="button">
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
