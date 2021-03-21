import React from "react";
import { useSelector } from "react-redux";
import { ordenarDataParaGrafico } from "../../helpers/ordenarDataParaGrafico";
import { CustomGraficoHorizontal } from "./CustomGraficoHorizontal";

export const GraficoPrincipalesCultivos = () => {
	const { permisos, campoOrdenador } = useSelector((state) => state.entidades);

	const completaTitulo = (campo) => {
		switch (campo) {
			case "nombreCultivo":
				return "cultivo";

			case "usuario":
				return "usuario";

			case "nombreProductor":
				return "productor";

			case "localidad":
				return "localidad";

			default:
				break;
		}
	};

	let data = [];
	let totalSuperficie = 0;
	let totalPermisos = 0;

	if (permisos) {
		data = ordenarDataParaGrafico(permisos, campoOrdenador);

		data.superficiesCultivos.forEach((superficie) => {
			totalSuperficie += superficie;
		});

		data.numeroPermisos.forEach((permisos) => {
			totalPermisos += permisos;
		});
	}

	const subtitulo1 = `Superficie incluida: ${totalSuperficie} ha`;
	const subtitulo2 = `Permisos incluidos: ${totalPermisos}`;

	return (
		<div>
			{data ? (
				<CustomGraficoHorizontal
					titulo={`Superficies por ${completaTitulo(campoOrdenador)}`}
					subtitulo1={subtitulo1}
					subtitulo2={subtitulo2}
					etiquetas={data.labels}
					dataSet={data.superficiesCultivos}
					ancho={220}
				></CustomGraficoHorizontal>
			) : (
				<></>
			)}
		</div>
	);
};
