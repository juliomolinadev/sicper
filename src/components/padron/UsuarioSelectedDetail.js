import React from "react";
import { useSelector } from "react-redux";

export const UsuarioSelectedDetail = () => {
	const altaPermisos = useSelector((state) => state.altaPermisos);

	return (
		<div className="border rounded mb-4 p-2">
			<div>Cuenta: {altaPermisos.cuenta}</div>
			<div>Usuario: {altaPermisos.usuario}</div>
			<div>Colonia/Ejido: {altaPermisos.nombreLocalidad}</div>
			<div>Lote: {altaPermisos.lote}</div>
			<div>Seccion: {altaPermisos.seccion}</div>
			<div>Sup. Derecho: {altaPermisos.supDerecho}</div>
			<div>Sup. Disponible: {altaPermisos.supDerecho - altaPermisos.supPrevia}</div>
			<div>Sistema: {altaPermisos.sistema}</div>
			{altaPermisos.reacomodo && (
				<div className="text-info">Reacomodo: {altaPermisos.reacomodo}</div>
			)}
		</div>
	);
};
