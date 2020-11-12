import React from "react";
import { useSelector } from "react-redux";

export const ProductorSelected = () => {
	const { productores, idProductorSelected } = useSelector((state) => state.altaPermisos);

	let rfc = "";
	let productor = "";

	productores.forEach((element) => {
		if (element.id === idProductorSelected) {
			rfc = element.rfc;
			productor = `${element.apPaterno} ${element.apMaterno} ${element.nombre}`;
		}
	});

	return (
		<div className="border rounded mb-4 p-2">
			<div className="row">
				<div className="col-sm-8">Productor: {productor}</div>
				<div className="col-sm-4">RFC Productor: {rfc}</div>
			</div>
		</div>
	);
};
