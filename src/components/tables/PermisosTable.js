import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { CustomPrintTable } from "./CustomPrintTable";
import { printPermisosColumns } from "./configTables";
import { startLoadPermisos } from "../../actions/entidades/permisos";
import { roundToN } from "../../helpers/functions/roundToN";

export const PermisosTable = () => {
	const { permisos } = useSelector((state) => state.entidades);
	const { modulo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const auth = useSelector((state) => state.auth);
	const ciclo = auth.variablesGlobales.cicloActual;

	const tiempo = Date.now();
	const fechaActual = new Date(tiempo);

	if (!permisos) {
		dispatch(startLoadPermisos("", modulo, ciclo, ["nombreCultivo"]));
	}

	let permisosFormateados = [];

	if (permisos) {
		const totales = {
			numeroPermiso: "TOTALES",
			supAutorizada: 0,
			cuotaCultivo: 0
		};

		permisos.forEach((permiso) => {
			totales.supAutorizada = totales.supAutorizada + permiso.supAutorizada;
			totales.cuotaCultivo =
				totales.cuotaCultivo + roundToN(permiso.cuotaCultivo * permiso.supAutorizada, 3);

			permisosFormateados.push({
				...permiso,
				fechaEmicion: moment(permiso.fechaEmicion.toDate()).format("DD/MM/YYYY"),
				fechaLimite: moment(permiso.fechaLimite.toDate()).format("DD/MM/YYYY"),
				vigencia: moment(permiso.vigencia.toDate()).format("DD/MM/YYYY"),
				cuotaCultivo: roundToN(permiso.cuotaCultivo * permiso.supAutorizada, 3)
			});
		});

		permisosFormateados.push(totales);
	}

	const titulo = "";

	return (
		<div>
			<CustomPrintTable
				title={titulo}
				columns={printPermisosColumns}
				data={permisosFormateados}
			></CustomPrintTable>
			<div className="mt-1">{fechaActual.toLocaleDateString()}</div>
		</div>
	);
};
