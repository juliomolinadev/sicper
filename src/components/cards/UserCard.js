import React from "react";
import { useSelector } from "react-redux";

export const UserCard = () => {
	const { usuario } = useSelector((state) => state.entidades);

	const {
		cuenta,
		subcta,
		nombreLocalidad,
		supRiego,
		predio,
		supPrevia,
		apPaterno,
		apMaterno,
		nombre,
		seccion,
		tipoLocalidad
	} = usuario;

	const derechoDisponible = supRiego - supPrevia;
	const nombreUsuario = `${apPaterno} ${apMaterno} ${nombre}`;

	return (
		<div className="border border-info rounded">
			<div className="border-bottom border-info p-2">
				<div className="d-flex justify-content-center">
					<h3>Cuenta: {`${cuenta}.${subcta}`}</h3>
				</div>
			</div>

			<div className="d-flex flex-column p-4">
				<div>Usuario: {nombreUsuario}</div>
				<div>Lote: {predio}</div>
				<div>
					{tipoLocalidad}: {nombreLocalidad}
				</div>
				<div>Seccion: {seccion}</div>
				<div>Sup. Derecho: {supRiego}</div>
				<div>Sup. Disponible: {derechoDisponible}</div>
			</div>
		</div>
	);
};
