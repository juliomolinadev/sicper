import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadPrincipalesCultivos } from "../../actions/entidades/principalesCultivos";
import { CustomGraficoHorizontal } from "./CustomGraficoHorizontal";

export const GraficoPrincipalesCultivos = () => {
	const { principalesCultivos } = useSelector((state) => state.entidades);
	const { claveEntidad } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	// TODO: crear funcion para definir ciclo
	const ciclo = "2020-2021";

	if (!principalesCultivos) {
		dispatch(startLoadPrincipalesCultivos(claveEntidad, ciclo));
	}

	let totalSuperficie = 0;
	let totalPermisos = 0;

	if (principalesCultivos) {
		principalesCultivos.superficiesCultivos.forEach((superficie) => {
			totalSuperficie += superficie;
		});

		principalesCultivos.numeroPermisos.forEach((permisos) => {
			totalPermisos += permisos;
		});
	}

	const subtitulo1 = `Superficie expedida: ${totalSuperficie} ha`;
	const subtitulo2 = `Permisos expedidos: ${totalPermisos}`;

	return (
		<div>
			{principalesCultivos ? (
				<CustomGraficoHorizontal
					titulo={"Superficies por cultivo "}
					subtitulo1={subtitulo1}
					subtitulo2={subtitulo2}
					etiquetas={principalesCultivos.labels}
					dataSet={principalesCultivos.superficiesCultivos}
					ancho={220}
				></CustomGraficoHorizontal>
			) : (
				<></>
			)}
		</div>
	);
};
