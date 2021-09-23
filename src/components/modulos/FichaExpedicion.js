import React, { useEffect } from "react";
import { SuperficiesChart } from "../charts/SuperficiesChart";
import { ResumenAutorizados } from "../autorizados/ResumenAutorizados";
import { useDispatch, useSelector } from "react-redux";
import { startLoadSuperficies } from "../../actions/permisosScreen";
import { startLoadAutorizados } from "../../actions/autorizadosScreen";

export const FichaExpedicion = () => {
	const { autorizados } = useSelector((state) => state.autorizadosScreen);
	const { modulo } = useSelector((state) => state.auth);
	// const { superficies } = useSelector((state) => state.permisosScreen);

	const dispatch = useDispatch();

	const auth = useSelector((state) => state.auth);
	const ciclo = auth.variablesGlobales.cicloActual;

	useEffect(() => {
		console.log("Effect: FichaExpedicion");
		dispatch(startLoadAutorizados(ciclo, modulo));
		dispatch(startLoadSuperficies(modulo, ciclo));
	}, [dispatch, ciclo, modulo]);

	// if (autorizados.length === 0) {
	// 	dispatch(startLoadAutorizados(ciclo, modulo));
	// }

	// if (superficies === null) {
	// 	dispatch(startLoadSuperficies(modulo, ciclo));
	// }

	return (
		<div className="border border-primary rounded detallePermiso text-secondary mt-3">
			<SuperficiesChart />
			{autorizados.length > 0 && (
				<ResumenAutorizados autorizados={autorizados} modulo={modulo}></ResumenAutorizados>
			)}
		</div>
	);
};
