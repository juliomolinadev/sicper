import React from "react";
import { modulosPorUnidad as modulos } from "../../../helpers/consts";
import { CheckboxButtonGroup } from "../molecules/CheckboxButtonGroup";

export const ModulosCheckbox = ({ modulosValues, handleModulosInputChange }) => {
	const checkboxStyles = {
		group: "btn-group btn-group-toggle",
		button: "btn btn-outline-primary"
	};

	return (
		<>
			<div className="col-sm-4 mt-5">
				<div className="row d-flex flex-column align-content-center">
					<p className=" d-flex justify-content-center"> Primera Unidad </p>

					<CheckboxButtonGroup
						options={modulos.primeraUnidad}
						formValues={modulosValues}
						setFunction={handleModulosInputChange}
						styles={checkboxStyles}
					/>
				</div>
			</div>

			<div className="col-sm-4 mt-5">
				<div className="row d-flex flex-column align-content-center">
					<p className=" d-flex justify-content-center"> Segunda Unidad </p>

					<CheckboxButtonGroup
						options={modulos.segundaUnidad}
						formValues={modulosValues}
						setFunction={handleModulosInputChange}
						styles={checkboxStyles}
					/>
				</div>
			</div>

			<div className="col-sm-4 mt-5">
				<div className="row d-flex flex-column align-content-center">
					<p className=" d-flex justify-content-center"> Tercera Unidad </p>

					<CheckboxButtonGroup
						options={modulos.terceraUnidad}
						formValues={modulosValues}
						setFunction={handleModulosInputChange}
						styles={checkboxStyles}
					/>
				</div>
			</div>
		</>
	);
};
