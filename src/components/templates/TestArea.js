import React from "react";
import { useForm } from "../../hooks/useForm";
import { SearchBar } from "../ui/molecules/SearchBar";

const searchBarStyles = {
	box: "d-flex",
	input: "form-control",
	button: "btn btn-outline-primary d-sm-block ml-auto",
	icon: "fas fa-search"
};

export const TestArea = () => {
	const [formValues, handleInputChange] = useForm({ localidadInForm: "" });
	const { localidadInForm } = formValues;

	console.log({ localidadInForm });

	return (
		<>
			<div className="row justify-content-center pt-5">
				<h1>TestArea</h1>
			</div>

			<SearchBar
				styles={searchBarStyles}
				inputName="localidadInForm"
				placeholder="Localidad"
				formValues={formValues}
				handleInputChange={handleInputChange}
			/>
		</>
	);
};
