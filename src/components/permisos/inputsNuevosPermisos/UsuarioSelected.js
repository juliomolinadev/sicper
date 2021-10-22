import React from "react";
import { useSelector } from "react-redux";

export const UsuarioSelected = () => {
	const { usuarios, idUsuarioSelected, supPrevia } = useSelector((state) => state.altaPermisos);

	const usuario = usuarios.find((usuario) => usuario.id === idUsuarioSelected);

	return (
		<div className="border rounded mb-4 p-2">
			<div className="row">
				<div className="col-sm-6">Cuenta: {`${usuario.cuenta}.${usuario.subcta}`}</div>
				<div className="col-sm-3">
					{usuario.tipoLocalidad}: {usuario.nombreLocalidad}
				</div>
				<div className="col-sm-3">Sup. Derecho: {usuario.supRiego}</div>
			</div>
			<div className="row">
				<div className="col-sm-6">
					Usuario: {`${usuario.apPaterno} ${usuario.apMaterno} ${usuario.nombre}`}
				</div>
				<div className="col-sm-3">Lote: {usuario.predio}</div>
				{usuario.supRiego - supPrevia === 0 ? (
					<div className="col-sm-3 text-danger">
						Sup. Disponible: {usuario.supRiego - supPrevia}
					</div>
				) : (
					<div className="col-sm-3">Sup. Disponible: {usuario.supRiego - supPrevia}</div>
				)}
			</div>
			<div className="row">
				<div className="col-sm-6">
					{usuario.reacomodo && <div className="text-info">Reacomodo: {usuario.reacomodo}</div>}
				</div>
				<div className="col-sm-3">Seccion: {usuario.seccion}</div>
				<div className="col-sm-3">Sistema: {usuario.sistRiego}</div>
			</div>
		</div>
	);
};
