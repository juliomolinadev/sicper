import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setAutorizadoSelected,
	setModulo,
	startLoadAutorizados
} from "../../actions/autorizadosScreen";
import { startLoadExpedicion } from "../../actions/sicperScreen";
import { modulos } from "../../helpers/consts";
import { sabeAutorizados } from "../../helpers/sabeAutorizados";
import { AutorizadosModal } from "../modals/AutorizadosModal";
import { AutorizadosPozoModal } from "../modals/AutorizadosPozoModal";
import { autorizadosColumns, autorizadosPozoColumns } from "../tables/configTables";
import { CustomTable } from "../tables/CustomTable";
import { ResumenAutorizados } from "./ResumenAutorizados";
import { ResumenAutorizadosPozo } from "./ResumenAutorizadosPozo";

export const AutorizadosScreen = () => {
	const dispatch = useDispatch();

	const { modulo, autorizados, autorizadoSelected, superficieReferencia } = useSelector(
		(state) => state.autorizadosScreen
	);

	const { variablesGlobales, privilegios } = useSelector((state) => state.auth);
	const ciclo = variablesGlobales.cicloActual;

	let totalGravedadNormalAutorizada = 0;
	let totalGravedadNormalAsignada = 0;
	let totalGravedadExtraAutorizada = 0;
	let totalGravedadExtraAsignada = 0;
	let totalPozoNormalAutorizada = 0;
	let totalPozoNormalAsignada = 0;
	let totalPozoExtraAutorizada = 0;
	let totalPozoExtraAsignada = 0;
	let superficieTotal = 0;

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

		superficieTotal =
			totalGravedadNormalAutorizada +
			totalGravedadNormalAsignada +
			totalGravedadExtraAutorizada +
			totalGravedadExtraAsignada +
			totalPozoNormalAutorizada +
			totalPozoNormalAsignada +
			totalPozoExtraAutorizada +
			totalPozoExtraAsignada;
	}

	const setModuloToEdit = (moduloToEdit) => {
		dispatch(setModulo(moduloToEdit));
		dispatch(startLoadAutorizados(ciclo, moduloToEdit));
		dispatch(startLoadExpedicion(moduloToEdit, ciclo));
	};

	const handleSaveAutorizados = () => {
		sabeAutorizados(ciclo, modulo, autorizados);
		dispatch(startLoadAutorizados(ciclo, modulo));
		dispatch(startLoadExpedicion(modulo, ciclo));
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

			<div className="row ">
				<div className="col-sm-8 pr-0 mt-3">
					{modulo === "Pozo Particular" ? (
						<CustomTable
							title="Autorizados"
							columns={autorizadosPozoColumns}
							data={autorizados}
							setFunction={setAutorizadoSelected}
						></CustomTable>
					) : (
						<CustomTable
							title="Autorizados"
							columns={autorizadosColumns}
							data={autorizados}
							setFunction={setAutorizadoSelected}
						></CustomTable>
					)}
				</div>

				{modulo ? (
					<div className="col-sm-4 pl-3 mt-3">
						<div className="d-flex flex-column border rounded border-info">
							{autorizados.length > 0 ? (
								modulo === "Pozo Particular" ? (
									<ResumenAutorizadosPozo
										autorizados={autorizados}
										modulo={modulo}
									></ResumenAutorizadosPozo>
								) : (
									<ResumenAutorizados
										autorizados={autorizados}
										modulo={modulo}
									></ResumenAutorizados>
								)
							) : (
								<></>
							)}

							{privilegios.editarAutorizados && superficieReferencia !== superficieTotal && (
								<div className="row p-1 pl-2  d-flex flex-column">
									<div className="d-flex justify-content-center pt-5 text-warning">
										! Hay modificaciones sin guardar !
									</div>
									<div className="d-flex justify-content-center pt-4 pb-4">
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
					</div>
				) : (
					<></>
				)}
			</div>
			{autorizadoSelected ? (
				modulo === "UNI01" || modulo === "UNI02" || modulo === "UNI03" ? (
					<AutorizadosPozoModal />
				) : (
					<AutorizadosModal />
				)
			) : (
				<></>
			)}
		</>
	);
};
