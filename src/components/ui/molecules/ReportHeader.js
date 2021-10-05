import React from "react";
import { useSelector } from "react-redux";

export const ReportHeader = ({ title }) => {
	const { name, entidad, img, variablesGlobales } = useSelector((state) => state.auth);

	const tiempo = Date.now();
	const fechaActual = new Date(tiempo);

	return (
		<div className="row border rounded border-dark m-0">
			<div className="col-2 p-3">
				<img
					className="align-self-center"
					src={`./logos/${img}`}
					alt="Logo de la entidad"
					style={{ maxHeight: 80 }}
				/>
			</div>

			<div className="col-4 p-3">
				<div className="">{`${entidad} - Operador: ${name}`} </div>
				<div className="">Distrito de riego 014 Rio Colorado</div>
				<div className="">Plataforma digital</div>
			</div>
			<div className="col-4 p-3 d-flex flex-column">
				<b>{title}</b>
				<b>Ciclo: {variablesGlobales.cicloActual}</b>
				<div>Fecha: {fechaActual.toLocaleDateString()}</div>
			</div>
		</div>
	);
};
