import React from "react";
import { useSelector } from "react-redux";

export const ReportHeader = ({ title, pages, page, range = "" }) => {
	const { name, email, entidad, img, variablesGlobales } = useSelector((state) => state.auth);

	const tiempo = Date.now();
	const fechaActual = new Date(tiempo);

	return (
		<div className="row border rounded border-dark m-0">
			<div className="col-2 p-3 d-flex justify-content-center">
				<img src={`./logos/${img}`} alt="Logo de la entidad" style={{ maxHeight: 80 }} />
			</div>

			<div className="col-3 p-3" style={{ maxHeight: 80 }}>
				<div>Operador: {name}</div>
				<div>{email}</div>
			</div>

			<div className="col-5 p-3 justify-content-center">
				<div className="d-flex justify-content-center">
					<b>{entidad}</b>
				</div>
				<div className="d-flex justify-content-center">
					<b>{title}</b>
				</div>
				<div className="d-flex justify-content-center">
					<div>{range}</div>
				</div>
			</div>

			<div className="col-2 p-3 d-flex flex-column">
				<b>Ciclo: {variablesGlobales.cicloActual}</b>
				<div>{fechaActual.toLocaleDateString()}</div>
				<div>
					Pagina {page} de {pages}
				</div>
			</div>
		</div>
	);
};
