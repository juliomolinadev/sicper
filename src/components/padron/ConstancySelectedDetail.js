import React from "react";

export const ConstancySelectedDetail = ({ constancy, setModalState }) => {
	const handleOpenModal = () => {
		const date = constancy.fecha.toDate();
		console.log(date);
		setModalState({
			openModal: true,
			constancySaved: true,
			constancia: { ...constancy, fecha: date }
		});
	};

	const usuario = `${constancy.apPaterno} ${constancy.apMaterno} ${constancy.nombre}`;

	return (
		<div className="border rounded mb-4 p-2">
			<div>
				<h5>Folio:{constancy.folio}</h5>
			</div>
			<div>Cuenta: {constancy.cuenta}</div>
			<div>Usuario: {usuario}</div>
			<div>
				{constancy.tipoLocalidad}: {constancy.nombreLocalidad}
			</div>
			<div>Lote: {constancy.predio}</div>
			<div>Sección: {constancy.seccion}</div>
			<div>Módulo: {constancy.modulo}</div>
			<div>Sup. Derecho: {constancy.supRiego}</div>
			<div>Sistema: {constancy.sistemaRiego}</div>
			{constancy.reacomodo && <div className="text-info">Reacomodo: {constancy.reacomodo}</div>}

			<div className="d-flex justify-content-center">
				<button className="btn btn-outline-primary m-4" onClick={handleOpenModal}>
					<i className="fas fa-print"></i>
					<span> Imprimir</span>
				</button>
			</div>
		</div>
	);
};
