import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setAutorizadoSelected,
	setModulo,
	startLoadAutorizados
} from "../../actions/autorizadosScreen";
import { sabeAutorizados } from "../../helpers/sabeAutorizados";
import { AutorizadosModal } from "../modals/AutorizadosModal";
import { autorizadosColumns } from "../tables/configTables";
import { CustomTable } from "../tables/CustomTable";

export const AutorizadosScreen = () => {
	const modulos = [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		"9B",
		10,
		11,
		12,
		14,
		15,
		16,
		17,
		18,
		19,
		20,
		21,
		22,
		"FL"
	];

	const dispatch = useDispatch();

	const { modulo, autorizados, autorizadoSelected, superficieReferencia } = useSelector(
		(state) => state.autorizadosScreen
	);

	let totalNormal = 0;
	let totalExtra = 0;
	let totalAsignada = 0;
	let superficieTotal = 0;

	if (modulo !== null) {
		autorizados.forEach((autorizado) => {
			totalNormal +=
				autorizado.normalGravedad + autorizado.normalPozoFederal + autorizado.normalPozoParticular;
			totalExtra +=
				autorizado.extraGravedad + autorizado.extraPozoFederal + autorizado.extraPozoParticular;
			totalAsignada +=
				autorizado.asignadaGravedad +
				autorizado.asignadaPozoFederal +
				autorizado.asignadaPozoParticular;
		});

		superficieTotal = totalNormal + totalExtra + totalAsignada;
	}

	const setModuloToEdit = (moduloToEdit) => {
		dispatch(setModulo(moduloToEdit));
		dispatch(startLoadAutorizados(moduloToEdit));
	};

	const handleSaveAutorizados = async () => {
		sabeAutorizados(modulo, autorizados);
		dispatch(startLoadAutorizados(modulo));
	};

	return (
		<>
			<div className="row pt-3 .autorizadosModal">
				<div className="col-sm-8 ">
					{modulos.map((moduloIndex) => {
						if (modulo === moduloIndex) {
							return (
								<button
									key={moduloIndex}
									className="btn btn-primary m-1"
									type="button"
									onClick={() => setModuloToEdit(moduloIndex)}
								>
									<span>M-{moduloIndex}</span>
								</button>
							);
						} else {
							return (
								<button
									key={moduloIndex}
									className="btn btn-outline-primary m-1"
									type="button"
									onClick={() => setModuloToEdit(moduloIndex)}
								>
									<span>M-{moduloIndex}</span>
								</button>
							);
						}
					})}
				</div>
			</div>

			<div className="row pt-5 pr-3">
				<div className="col-sm-8">
					{modulo ? (
						<CustomTable
							title="Autorizados"
							columns={autorizadosColumns}
							data={autorizados}
							setFunction={setAutorizadoSelected}
						></CustomTable>
					) : (
						<></>
					)}
				</div>

				{modulo ? (
					<div className="col-sm-4 d-flex flex-column border rounded border-info">
						<div className="row bg-light border-info border-bottom rounded-top p-1 justify-content-center font-weight-bold text-secondary pt-3">
							<h5>Módulo {modulo}</h5>
						</div>

						<div className="row p-1 pl-2 pt-4">
							<div className="col-6 d-flex justify-content-end">NORMAL:</div>
							<div className="col-6">{totalNormal}</div>
						</div>

						<div className="row p-1 pl-2 pt-2">
							<div className="col-6 d-flex justify-content-end">EXTRA:</div>
							<div className="col-6">{totalExtra}</div>
						</div>

						<div className="row p-1 pl-2 pt-2">
							<div className="col-6 d-flex justify-content-end">DISPONIBLE:</div>
							<div className="col-6">{totalAsignada}</div>
						</div>

						{superficieReferencia === superficieTotal ? (
							<></>
						) : (
							<div className="row p-1 pl-2  d-flex flex-column">
								<div className="d-flex justify-content-center pt-5 text-warning">
									! Hay modificaciones sin guardar !
								</div>
								<div className="d-flex justify-content-center pt-4">
									<button
										type="submit"
										className="btn btn-outline-primary"
										onClick={handleSaveAutorizados}
									>
										<i className="far fa-save"></i>
										<span> Guardar Cambios</span>
									</button>
								</div>
							</div>
						)}
					</div>
				) : (
					<></>
				)}
			</div>
			{autorizadoSelected ? <AutorizadosModal /> : <></>}
		</>
	);
};
