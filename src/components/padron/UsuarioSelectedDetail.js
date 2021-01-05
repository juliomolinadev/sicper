import React from "react";
import { useSelector } from "react-redux";

export const UsuarioSelectedDetail = () => {
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
			localidad = usuario.localidad;
			derecho = usuario.supRiego;
			lote = usuario.predio;
			derechoDisponible = derecho - supPrevia;
			nombreUsuario = `${usuario.apPaterno} ${usuario.apMaterno} ${usuario.nombre}`;
			seccion = usuario.seccion;
		}
	});

	return (
		<div className="border rounded mb-4 p-2">
			<div>Cuenta: {cuenta}</div>
			<div>Colonia/Ejido: {localidad}</div>
			<div>Sup. Derecho: {derecho}</div>
			<div>Usuario: {nombreUsuario}</div>
			<div>Lote: {lote}</div>
			<div>Sup. Disponible: {derechoDisponible}</div>
			<div></div>
			<div>Seccion: {seccion}</div>
		</div>
	);
};
