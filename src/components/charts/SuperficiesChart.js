import React from "react";
import { HorizontalBar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { setSuperficiesDataformat } from "./setSuperficiesDataformat";

export const SuperficiesChart = () => {
	const { superficies } = useSelector((state) => state.permisosScreen);

	let data = {};
	let totalSuperficie = 0;
	let totalPermisos = 0;

	if (superficies !== null) {
		data = setSuperficiesDataformat(superficies, "Superficie por cultivo");

		superficies.superficiesCultivos.forEach((superficie) => {
			totalSuperficie += superficie;
		});

		superficies.numeroPermisos.forEach((permisos) => {
			totalPermisos += permisos;
		});
	}

	const options = {
		scales: {
			yAxes: [
				{
					ticks: {
						beginAtZero: true
					}
				}
			]
		}
	};

	return (
		<div className="pt-4">
			<div className="d-flex justify-content-center">
				<h5>Superficies por cultivo</h5>
			</div>
			<div className="d-flex flex-column pt-4 pb-4 pl-3">
				<div>
					<h6>Superficie expedida: {totalSuperficie} ha</h6>
				</div>
				<div>
					<h6>Permisos expedidos: {totalPermisos}</h6>
				</div>
			</div>
			<div className="pb-4">
				<HorizontalBar data={data} options={options} width={220} />
			</div>
		</div>
	);
};
