import React from "react";

export const ResumenAutorizados = ({ autorizados, modulo }) => {
	let totalGravedadNormalAutorizada = 0;
	let totalGravedadNormalAsignada = 0;
	let totalGravedadExtraAutorizada = 0;
	let totalGravedadExtraAsignada = 0;
	let totalPozoNormalAutorizada = 0;
	let totalPozoNormalAsignada = 0;
	let totalPozoExtraAutorizada = 0;
	let totalPozoExtraAsignada = 0;

	if (modulo !== null) {
		autorizados.forEach((autorizado) => {
			totalGravedadNormalAutorizada += autorizado.gravedadNormalAutorizada;
			totalGravedadNormalAsignada += autorizado.gravedadNormalAsignada;
			totalGravedadExtraAutorizada += autorizado.gravedadExtraAutorizada;
			totalGravedadExtraAsignada += autorizado.gravedadExtraAsignada;
			totalPozoNormalAutorizada += autorizado.pozoNormalAutorizada;
			totalPozoNormalAsignada += autorizado.pozoNormalAsignada;
			totalPozoExtraAutorizada += autorizado.pozoExtraAutorizada;
			totalPozoExtraAsignada += autorizado.pozoExtraAsignada;
		});
	}

	return (
		<>
			<div className="d-flex bg-light border-info border-bottom rounded-top p-1 justify-content-center font-weight-bold text-secondary pt-3">
				<h5>Módulo {modulo}</h5>
			</div>

			<div className="table-responsive">
				<table className="table table-info mb-0 text-secondary">
					<thead>
						<tr>
							<th colSpan="3">Total Superficie Normal</th>
						</tr>
						<tr>
							<th scope="col">Sistema</th>
							<th scope="col">Autorizada</th>
							<th scope="col">Asignada</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<th scope="row">Gravedad</th>
							<td>{totalGravedadNormalAutorizada}</td>
							<td>{totalGravedadNormalAsignada}</td>
						</tr>
						<tr>
							<th scope="row">Pozo Federal</th>
							<td>{totalPozoNormalAutorizada}</td>
							<td>{totalPozoNormalAsignada}</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div className="table-responsive">
				<table className="table table-table-secondary text-secondary">
					<thead>
						<tr>
							<th colSpan="3">Total Superficie Extra</th>
						</tr>
						<tr>
							<th scope="col">Sistema</th>
							<th scope="col">Autorizada</th>
							<th scope="col">Asignada</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<th scope="row">Gravedad</th>
							<td>{totalGravedadExtraAutorizada}</td>
							<td>{totalGravedadExtraAsignada}</td>
						</tr>
						<tr>
							<th scope="row">Pozo Federal</th>
							<td>{totalPozoExtraAutorizada}</td>
							<td>{totalPozoExtraAsignada}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};
