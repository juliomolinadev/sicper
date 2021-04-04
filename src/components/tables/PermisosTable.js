import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { CustomPrintTable } from "./CustomPrintTable";
import { permisosColumns } from "./configTables";
import { startLoadPermisos } from "../../actions/entidades/permisos";

export const PermisosTable = () => {
	const { permisos } = useSelector((state) => state.entidades);
	const { modulo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	// TODO: crear funcion para definir ciclo
	const ciclo = "2020-2021";

	if (!permisos) {
		dispatch(startLoadPermisos("", modulo, ciclo, ["nombreCultivo"]));
	}

	let permisosFormateados = [];

	if (permisos) {
		permisos.forEach((permiso) => {
			permisosFormateados.push({
				...permiso,
				fechaEmicion: moment(permiso.fechaEmicion.toDate()).format("DD/MM/YYYY"),
				fechaLimite: moment(permiso.fechaLimite.toDate()).format("DD/MM/YYYY"),
				vigencia: moment(permiso.vigencia.toDate()).format("DD/MM/YYYY")
			});
		});
	}

	const titulo = "";

	return (
		<div>
			<CustomPrintTable
				title={titulo}
				columns={permisosColumns}
				data={permisosFormateados}
			></CustomPrintTable>
		</div>
	);
};
