import React from "react";
import { ButtonGroup } from "../molecules/ButtonGroup";

export const ModulosCheckbox = ({ state, dispatch }) => {
	const { unidades, modulosPorUnidad } = state;
	const { primeraUnidad, segundaUnidad, terceraUnidad } = modulosPorUnidad;

	const buttonClasses = {
		on: "btn btn-primary",
		off: "btn btn-outline-primary"
	};

	return (
		<>
			<div className="row justify-content-center mt-5">
				<ButtonGroup
					options={unidades}
					setFunction={(unidad) => {
						dispatch({ type: "setUnidad", payload: unidad });
					}}
					groupStyles="btn-group btn-group-toggle"
					buttonStyles={buttonClasses}
				/>
			</div>

			<div className="row d-flex justify-content-around">
				<div className="mt-3">
					<ButtonGroup
						options={primeraUnidad}
						setFunction={(modulo) => {
							dispatch({
								type: "changeModulo",
								payload: { unidad: "primeraUnidad", modulo: modulo }
							});
						}}
						groupStyles="btn-group btn-group-toggle"
						buttonStyles={buttonClasses}
					/>
				</div>

				<div className="mt-3">
					<ButtonGroup
						options={segundaUnidad}
						setFunction={(modulo) => {
							dispatch({
								type: "changeModulo",
								payload: { unidad: "segundaUnidad", modulo: modulo }
							});
						}}
						groupStyles="btn-group btn-group-toggle"
						buttonStyles={buttonClasses}
					/>
				</div>
				<div className="mt-3">
					<ButtonGroup
						options={terceraUnidad}
						setFunction={(modulo) => {
							dispatch({
								type: "changeModulo",
								payload: { unidad: "terceraUnidad", modulo: modulo }
							});
						}}
						groupStyles="btn-group btn-group-toggle"
						buttonStyles={buttonClasses}
					/>
				</div>
			</div>
		</>
	);
};
