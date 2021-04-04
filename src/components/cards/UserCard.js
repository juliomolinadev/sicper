import React from "react";
import { useSelector } from "react-redux";

export const UserCard = () => {
	const { usuario } = useSelector((state) => state.entidades);

	if (usuario) {
		const cuenta = `${usuario.cuenta}.${usuario.subcta}`;
		const localidad = usuario.localidad;
		const derecho = usuario.supRiego;
		const lote = usuario.predio;
		const derechoDisponible = derecho - usuario.supPrevia;
		const nombreUsuario = `${usuario.apPaterno} ${usuario.apMaterno} ${usuario.nombre}`;
		const seccion = usuario.seccion;

		return (
			<div className="row border border-info rounded m-1">
				<div className="col-12">
					<div className="row border-bottom border-info p-2">
						<div className="col-12 d-flex justify-content-center">
							<h3>Cuenta: {cuenta}</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-12 d-flex flex-column p-4">
							<div>Usuario: {nombreUsuario}</div>
							<div>Lote: {lote}</div>
							<div>Colonia/Ejido: {localidad}</div>
							<div>Seccion: {seccion}</div>
							<div>Sup. Derecho: {derecho}</div>
							<div>Sup. Disponible: {derechoDisponible}</div>
						</div>
					</div>
				</div>
			</div>
		);
	} else return <></>;
};
