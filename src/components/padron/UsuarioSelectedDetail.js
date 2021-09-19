import React from "react";
import { useSelector } from "react-redux";

export const UsuarioSelectedDetail = () => {
	const { usuarios, idUsuarioSelected, supPrevia } = useSelector((state) => state.altaPermisos);

	const usuario = usuarios.find((usuario) => usuario.id === idUsuarioSelected);

	return (
		<div className="border rounded mb-4 p-2">
			<div>Cuenta: {`${usuario.cuenta}.${usuario.subcta}`}</div>
			<div>Usuario: {`${usuario.apPaterno} ${usuario.apMaterno} ${usuario.nombre}`}</div>
			<div>Colonia/Ejido: {usuario.localidad}</div>
			<div>Lote: {usuario.predio}</div>
			<div>Seccion: {usuario.seccion}</div>
			<div>Sup. Derecho: {usuario.supRiego}</div>
			<div>Sup. Disponible: {usuario.supRiego - supPrevia}</div>
			{usuario.reacomodo && <div className="text-info">Reacomodo: {usuario.reacomodo}</div>}
		</div>
	);
};
