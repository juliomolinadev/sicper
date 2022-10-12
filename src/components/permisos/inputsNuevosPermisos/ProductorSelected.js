import React from "react";
import { useSelector } from "react-redux";

export const ProductorSelected = () => {
	const { productores, idProductorSelected } = useSelector((state) => state.altaPermisos);
	const { modulo } = useSelector((state) => state.auth);

	const productor = productores.find((productor) => productor.id === idProductorSelected);

	return (
		<div className="border rounded mb-4 p-2">
			<div className="row">
				<div className="col-sm-5">
					Productor: {`${productor.apPaterno} ${productor.apMaterno} ${productor.nombre}`}
				</div>
				<div className="col-sm-4">CURP: {productor.curp}</div>
				<div className="col-sm-3">RFC: {productor.rfc}</div>
			</div>

			{productor.concesiones &&
				productor.concesiones.map((concesion) => {
					if (concesion.modulo === modulo)
						return (
							<div
								className="row"
								key={`${concesion.idProductor}-${concesion.modulo}-${concesion.cultivo}`}
							>
								<div className="col-sm-2">Modulo: {concesion.modulo}</div>
								<div className="col-sm-4">Cultivo: {concesion.cultivo}</div>
								<div className="col-sm-2">Padrón: {concesion.supConcesion} (Ha)</div>
								<div className="col-sm-2">Expedida: {concesion.supExpedida} (Ha)</div>
								<div className="col-sm-2">
									Disponible: {concesion.supConcesion - concesion.supExpedida} (Ha)
								</div>
							</div>
						);
					else return <></>;
				})}
		</div>
	);
};
