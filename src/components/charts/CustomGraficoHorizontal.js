import React from "react";
import { HorizontalBar } from "react-chartjs-2";

export const CustomGraficoHorizontal = ({
	titulo,
	subtitulo1,
	subtitulo2,
	etiquetas,
	dataSet,
	ancho
}) => {
	const data = {
		labels: etiquetas,
		datasets: [
			{
				label: titulo,
				data: dataSet,
				backgroundColor: [
					"rgba(255, 99, 132, 0.2)",
					"rgba(54, 162, 235, 0.2)",
					"rgba(255, 206, 86, 0.2)",
					"rgba(75, 192, 192, 0.2)",
					"rgba(153, 102, 255, 0.2)",
					"rgba(255, 159, 64, 0.2)"
				],
				borderColor: [
					"rgba(255, 99, 132, 1)",
					"rgba(54, 162, 235, 1)",
					"rgba(255, 206, 86, 1)",
					"rgba(75, 192, 192, 1)",
					"rgba(153, 102, 255, 1)",
					"rgba(255, 159, 64, 1)"
				],
				borderWidth: 1
			}
		]
	};

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
		<div className="pt-4 text-secondary">
			<div className="d-flex justify-content-center">
				<h5>{titulo}</h5>
			</div>
			<div className="d-flex flex-column pt-4 pb-4 pl-3">
				<div>
					<h6>{subtitulo1}</h6>
				</div>
				<div>
					<h6>{subtitulo2}</h6>
				</div>
			</div>
			<div className="pb-4">
				<HorizontalBar data={data} options={options} width={ancho} />
			</div>
		</div>
	);
};
