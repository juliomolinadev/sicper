import React from "react";
import { useSelector } from "react-redux";

export const ReportHeader = () => {
	const { name, entidad, img, variablesGlobales } = useSelector((state) => state.auth);

	return (
		<div className="row border rounded border-dark">
			<div className="col-sm-3 p-3">
				<img
					className="align-self-center"
					src={`./logos/${img}`}
					alt="Logo de la entidad"
					style={{ maxHeight: 80 }}
				/>
			</div>

			<div className="col-sm-9 p-3">
				<div className="">{`${entidad} - Operador: ${name}`} </div>
				<b>Ciclo: {variablesGlobales.cicloActual}</b>
				<div className="">Plataforma digital</div>
				<div className="">Distrito de riego 014 Rio Colorado</div>
			</div>
		</div>
	);
};
