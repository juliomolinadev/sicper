import React from "react";

export const ProductorDetail = ({ productor, dispatch }) => {
	const {
		id,
		apPaterno,
		apMaterno,
		nombre,
		direccion,
		estado,
		municipio,
		rfc,
		telefono,
		genero,
		cp,
		fechaRegistro
	} = productor;

	const dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
	const fecha = fechaRegistro.toDate();

	const openEditModal = () => {
		dispatch({
			type: "openModal"
		});
	};

	return (
		<div className="border rounded p-3">
			<div>
				<b>CURP: </b>
				{id}
			</div>
			<div>
				<b>RFC: </b>
				{rfc}
			</div>
			<div>
				<b>PATERNO: </b>
				{apPaterno}
			</div>
			<div>
				<b>MATERNO: </b>
				{apMaterno}
			</div>
			<div>
				<b>NOMBRE: </b>
				{nombre}
			</div>
			<div>
				<b>GENERO: </b>
				{genero}
			</div>
			<div>
				<b>DIRECCION: </b>
				{direccion}
			</div>
			<div>
				<b>MUNICIPIO: </b>
				{municipio}
			</div>
			<div>
				<b>ESTADO: </b>
				{estado}
			</div>
			<div>
				<b>CP: </b>
				{cp}
			</div>
			<div>
				<b>TELEFONO: </b>
				{telefono}
			</div>
			<div>
				<b>REGISTRO: </b>
				{fecha.toLocaleString("es-MX", dateOptions).toUpperCase()}
			</div>

			<div className="mt-5 d-flex justify-content-center">
				<button className="btn btn-outline-primary" onClick={openEditModal}>
					Editar
				</button>
			</div>
		</div>
	);
};
