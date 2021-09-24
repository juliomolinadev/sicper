import React from "react";
import { useSelector } from "react-redux";

export const ProductorSelected = () => {
	const { productores, idProductorSelected } = useSelector((state) => state.altaPermisos);

	let rfc = "";
	let productor = "";
	let curp = "";

	productores.forEach((element) => {
		if (element.id === idProductorSelected) {
			rfc = element.rfc;
			curp = element.curp;
			productor = `${element.apPaterno} ${element.apMaterno} ${element.nombre}`;
		}
	});

	return (
		<div className="border rounded mb-4 p-2">
			<div className="row">
				<div className="col-sm-5">Productor: {productor}</div>
				<div className="col-sm-4">CURP: {curp}</div>
				<div className="col-sm-3">RFC: {rfc}</div>
			</div>
		</div>
	);
};
