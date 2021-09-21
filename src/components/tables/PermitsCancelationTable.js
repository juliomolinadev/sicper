import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { setPermitToCancel, startLoadPreCancelPermits } from "../../actions/permisosScreen";
import { permisosColumns } from "./configTables";
import { CustomTable } from "./CustomTable";

export const PermitsCancelationTable = () => {
	const { preCancelPermits } = useSelector((state) => state.permisosScreen);

	const auth = useSelector((state) => state.auth);
	const ciclo = auth.variablesGlobales.cicloActual;

	const dispatch = useDispatch();

	if (!preCancelPermits) {
		dispatch(startLoadPreCancelPermits(ciclo));
	}

	let permisosFormateados = [];

	if (preCancelPermits) {
		preCancelPermits.forEach((permiso) => {
			permisosFormateados.push({
				...permiso,
				fechaEmicion: moment(permiso.fechaEmicion.toDate()).format("DD/MM/YYYY"),
				fechaLimite: moment(permiso.fechaLimite.toDate()).format("DD/MM/YYYY"),
				vigencia: moment(permiso.vigencia.toDate()).format("DD/MM/YYYY")
			});
		});
	}

	return (
		<CustomTable
			title="Permisos en proceso de cancelación"
			columns={permisosColumns}
			data={permisosFormateados}
			setFunction={setPermitToCancel}
		></CustomTable>
	);
};
