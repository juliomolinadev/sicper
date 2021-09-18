import React from "react";
import { SuperficiesChart } from "../charts/SuperficiesChart";
import { ResumenAutorizados } from "../autorizados/ResumenAutorizados";
import { useDispatch, useSelector } from "react-redux";
import { startLoadSuperficies } from "../../actions/permisosScreen";
import { startLoadAutorizados } from "../../actions/autorizadosScreen";

export const FichaExpedicion = () => {
	const { autorizados } = useSelector((state) => state.autorizadosScreen);
	const { modulo } = useSelector((state) => state.auth);
	const { superficies } = useSelector((state) => state.permisosScreen);

	const dispatch = useDispatch();

	// TODO: crear funcion para definir ciclo
	const ciclo = "2020-2021";
	if (autorizados.length === 0) {
		dispatch(startLoadAutorizados(ciclo, modulo));
	}

	if (superficies === null) {
		dispatch(startLoadSuperficies(modulo, ciclo));
	}

	return (
		<div className="border border-primary rounded detallePermiso text-secondary mt-3">
			<SuperficiesChart />
			{autorizados.length > 0 && (
				<ResumenAutorizados autorizados={autorizados} modulo={modulo}></ResumenAutorizados>
			)}
		</div>
	);
};
