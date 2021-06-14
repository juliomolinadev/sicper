import React from "react";
import { modulosPorUnidad as modulos } from "../../../helpers/consts";
import { CheckboxButtonGroup } from "../molecules/CheckboxButtonGroup";

export const ModulosCheckbox = ({ modulosValues, handleModulosInputChange }) => {
	const checkboxStyles = {
		group: "btn-group btn-group-toggle",
		button: "btn btn-outline-primary"
	};

	// TODO: Usar un custom Hook para mejorar los checkbox
	const selectUnidad = (modulos) => {
		modulos.forEach((modulo) => {
			modulosValues[modulo] = true;
			handleModulosInputChange({
				target: { type: "checkbox", name: modulo, checked: true }
			});
		});
	};

	return (
		<>
			<div className="col-sm-4 mt-5">
				<div className="row d-flex flex-column align-content-center">
					<div className=" d-flex justify-content-center mb-3">
						<button
							className="btn btn-outline-primary"
							onClick={() => selectUnidad(modulos.primeraUnidad)}
						>
							Primera Unidad
						</button>
					</div>

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
					<div className=" d-flex justify-content-center mb-3">
						<button
							className="btn btn-outline-primary"
							onClick={() => selectUnidad(modulos.segundaUnidad)}
						>
							Segunda Unidad
						</button>
					</div>

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
					<div className=" d-flex justify-content-center mb-3">
						<button
							className="btn btn-outline-primary"
							onClick={() => selectUnidad(modulos.terceraUnidad)}
						>
							Tercera Unidad
						</button>
					</div>

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
