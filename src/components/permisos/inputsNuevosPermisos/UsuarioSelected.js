import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const UsuarioSelected = () => {
	const dispatch = useDispatch();

	const { usuarios, cuentaSelected, subCuentaSelected } = useSelector(
		(state) => state.altaPermisos
	);

	let localidad = "";
	let derecho = "";
	let lote = "";
	let derechoDisponible = "";
	let usuario = "";
	let seccion = "";

	usuarios.forEach((element) => {
		if (element.cuenta === cuentaSelected && element.subcta === subCuentaSelected) {
			localidad = element.ejido;
			derecho = element.supRiego;
			lote = element.predio;
			if (element.supDisponible) {
				derechoDisponible = element.supDisponible;
			} else {
				derechoDisponible = derecho;
			}
			usuario = `${element.apPaterno} ${element.apMaterno} ${element.nombre}`;
			seccion = element.seccion;
		}
	});

	return (
		<div className="border rounded mb-4 p-2">
			<div className="row">
				<div className="col-sm-6">Cuenta: {cuentaSelected}</div>
				<div className="col-sm-3">Colonia/Ejido: {localidad}</div>
				<div className="col-sm-3">Sup. Derecho: {derecho}</div>
			</div>
			<div className="row">
				<div className="col-sm-6">SubCuenta: {subCuentaSelected}</div>
				<div className="col-sm-3">Lote: {lote}</div>
				<div className="col-sm-3">Sup. Disponible: {derechoDisponible}</div>
			</div>
			<div className="row">
				<div className="col-sm-6">Usuario: {usuario}</div>
				<div className="col-sm-3">Seccion: {seccion}</div>
			</div>
		</div>
	);
};
