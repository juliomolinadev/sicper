import React from "react";
import { useSelector } from "react-redux";

export const UsuarioSelected = () => {
	const { usuarios, idUsuarioSelected, supPrevia } = useSelector((state) => state.altaPermisos);

	let localidad = "";
	let cuenta = "";
	let derecho = "";
	let lote = "";
	let derechoDisponible = "";
	let nombreUsuario = "";
	let seccion = "";

	usuarios.forEach((usuario) => {
		if (usuario.id === idUsuarioSelected) {
			cuenta = `${usuario.cuenta}.${usuario.subcta}`;
			localidad = usuario.ejido;
			derecho = usuario.supRiego;
			lote = usuario.predio;
			derechoDisponible = derecho - supPrevia;
			nombreUsuario = `${usuario.apPaterno} ${usuario.apMaterno} ${usuario.nombre}`;
			seccion = usuario.seccion;
		}
	});

	return (
		<div className="border rounded mb-4 p-2">
			{/* TODO: Poner alerta cuando la cuenta no tenga superficie disponible */}
			<div className="row">
				<div className="col-sm-6">Cuenta: {cuenta}</div>
				<div className="col-sm-3">Colonia/Ejido: {localidad}</div>
				<div className="col-sm-3">Sup. Derecho: {derecho}</div>
			</div>
			<div className="row">
				<div className="col-sm-6">Usuario: {nombreUsuario}</div>
				<div className="col-sm-3">Lote: {lote}</div>
				<div className="col-sm-3">Sup. Disponible: {derechoDisponible}</div>
			</div>
			<div className="row">
				<div className="col-sm-6"></div>
				<div className="col-sm-3">Seccion: {seccion}</div>
			</div>
		</div>
	);
};
