import React from "react";

export const ResumenAutorizadosPozo = ({ autorizados, modulo }) => {
	let totalPozoNormalAutorizada = 0;
	let totalPozoNormalAsignada = 0;
	let totalPozoExtraAutorizada = 0;
	let totalPozoExtraAsignada = 0;

	if (modulo !== null) {
		autorizados.forEach((autorizado) => {
			totalPozoNormalAutorizada += autorizado.pozoNormalAutorizada;
			totalPozoNormalAsignada += autorizado.pozoNormalAsignada;
			totalPozoExtraAutorizada += autorizado.pozoExtraAutorizada;
			totalPozoExtraAsignada += autorizado.pozoExtraAsignada;
		});
	}

	return (
		<>
			<div className="d-flex bg-light border-info border-bottom rounded-top p-1 justify-content-center font-weight-bold text-secondary pt-3">
				<h5> {modulo}</h5>
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
							<th scope="row">Pozo Particular</th>
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
							<th scope="row">Pozo Particular</th>
							<td>{totalPozoExtraAutorizada}</td>
							<td>{totalPozoExtraAsignada}</td>
						</tr>
					</tbody>
				</table>
			</div>
		</>
	);
};
