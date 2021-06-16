import React from "react";
// import { modulosPorUnidad as modulos } from "../../../helpers/consts";
// import { CheckboxButtonGroup } from "../molecules/CheckboxButtonGroup";
// import { useSingleSelectionButtonGroup } from "../../../hooks/useSingleSelectionButtonGroup";
import { ButtonGroup } from "../molecules/ButtonGroup";

export const ModulosCheckbox = ({
	buttonValues,
	handleSelectButton,
	primeraValues,
	primeraInputChange,
	segundaValues,
	segundaInputChange,
	terceraValues,
	terceraInputChange
}) => {
	const buttonClasses = {
		on: "btn btn-primary",
		off: "btn btn-outline-primary"
	};

	return (
		<>
			<div className="row justify-content-center mt-5">
				<ButtonGroup
					options={buttonValues}
					setFunction={handleSelectButton}
					groupStyles="btn-group btn-group-toggle"
					buttonStyles={buttonClasses}
				/>
			</div>

			<div className="row d-flex justify-content-around">
				<div className="mt-3">
					<ButtonGroup
						options={primeraValues}
						setFunction={primeraInputChange}
						groupStyles="btn-group btn-group-toggle"
						buttonStyles={buttonClasses}
					/>
				</div>

				<div className="mt-3">
					<ButtonGroup
						options={segundaValues}
						setFunction={segundaInputChange}
						groupStyles="btn-group btn-group-toggle"
						buttonStyles={buttonClasses}
					/>
				</div>
				<div className="mt-3">
					<ButtonGroup
						options={terceraValues}
						setFunction={terceraInputChange}
						groupStyles="btn-group btn-group-toggle"
						buttonStyles={buttonClasses}
					/>
				</div>
			</div>
		</>
	);
};
