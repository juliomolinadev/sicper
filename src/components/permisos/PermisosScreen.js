import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Swal from "sweetalert2";

import { CustomTable } from "../tables/CustomTable";
import { permisosColumns } from "../tables/configTables";
import {
	startLoadPermisos,
	startLoadPermisosSearch,
	startLoadSuperficies,
	openGuiaForm,
	startSetPermisoSelected,
	openGuiaPrint
} from "../../actions/permisosScreen";
import { openPrintPermisoModal } from "../../actions/altaPermisos";
import { PrintPermisoModal } from "../modals/PrintPermisoModal";
import { setPermisoInCancelProces } from "../../helpers/setPermisoInCancelProces";
import { useForm } from "../../hooks/useForm";
import { SuperficiesChart } from "../charts/SuperficiesChart";
import { NuevoPermisoButton } from "../buttons/NuevoPermisoButton";
import { PermitsCancellationModule } from "../ui/organisms/PermitsCancellationModule";
import { roundToN } from "../../helpers/functions/roundToN";
import { unsetUsuarioSelected } from "../../actions/usuarios";
import { PrintGuiaModal } from "../modals/PrintGuiaModal";
import { GuiaFormModal } from "../modals/GuiaFormModal";

export const PermisosScreen = () => {
	const dispatch = useDispatch();

	const [formValues, handleInputChange] = useForm({ palabra: "" });

	const { palabra } = formValues;

	const { permisos, permisoSelected, guia, isGuiaPrintModalOpen } = useSelector(
		(state) => state.permisosScreen
	);
	const { modulo, privilegios, expedicionActivaModulo, uid } = useSelector((state) => state.auth);

	const { variablesGlobales } = useSelector((state) => state.auth);
	const { cicloConsulta: ciclo, expedicionActiva } = variablesGlobales;

	const cultivosConGuia = [3];

	useEffect(() => {
		dispatch(startLoadPermisos(modulo, ciclo));
		dispatch(startLoadSuperficies(modulo, ciclo));
		dispatch(unsetUsuarioSelected());
	}, [dispatch, modulo, ciclo]);

	const buscarPermisos = () => {
		if (palabra.length > 0) {
			dispatch(startLoadPermisosSearch(palabra, modulo, ciclo));
		} else {
			Swal.fire(
				"Nada para buscar",
				"Ingrese número de permiso, número de cuenta o el apellido paterno del usuario.",
				"warning"
			);
		}
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			buscarPermisos();
		}
	};

	let permisosFormateados = [];

	permisos.forEach((permiso) => {
		permisosFormateados.push({
			...permiso,
			fechaEmicion: moment(permiso.fechaEmicion.toDate()).format("DD/MM/YYYY"),
			fechaLimite: moment(permiso.fechaLimite.toDate()).format("DD/MM/YYYY"),
			vigencia: moment(permiso.vigencia.toDate()).format("DD/MM/YYYY")
		});
	});

	let dataPermiso;

	permisos.forEach((permiso) => {
		if (permiso.id === permisoSelected) {
			dataPermiso = permiso;
		}
	});

	let dataPermisoImprecion = {};

	if (dataPermiso !== undefined) {
		dataPermisoImprecion = {
			...dataPermiso,
			fechaEmicion: dataPermiso.fechaEmicion.toDate(),
			fechaLimite: dataPermiso.fechaLimite.toDate(),
			vigencia: dataPermiso.vigencia.toDate()
		};
	}

	const handleOpenPrintPermisoModal = () => {
		dispatch(openPrintPermisoModal());
	};

	const handleOpenPrintGuiaModal = () => {
		dispatch(openGuiaPrint());
	};

	const startOpenGuiaForm = () => {
		dispatch(openGuiaForm());
	};

	const cancelarPermiso = () => {
		Swal.fire({
			input: "textarea",
			inputPlaceholder: "Indique la razón por la que desea cancelar el permiso",

			title: "Atención!!",
			text: `Está a punto de cancelar el permiso ${dataPermiso.numeroPermiso}, ¿Realmente desea cancelar este permiso?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si",
			cancelButtonText: "No"
		}).then(({ isConfirmed, value: motivo }) => {
			if (isConfirmed) {
				if (motivo.length > 0) {
					setPermisoInCancelProces(permisoSelected, modulo, ciclo, motivo, uid);
					dispatch(startLoadPermisos(modulo, ciclo));
					Swal.fire(
						"Solicitud recibida",
						`Se inició el proceso de cancelación para el permiso ${dataPermiso.numeroPermiso}`,
						"success"
					);
				} else {
					Swal.fire("Error", `Indique la razón por la que desea cancelar el permiso`, "warning");
				}
			}
		});
	};

	const getDotacion = (sistema) => {
		if (sistema === "Gravedad") return dataPermiso.dotacionGravedad;
		if (sistema === "Pozo Federal") return dataPermiso.dotacionPozo;
		if (sistema === "Pozo Particular") return dataPermiso.dotacionPozo;
	};

	return (
		<>
			<div className="row mt-5">
				<div className="col-sm-8">
					<div className="row d-flex">
						<div className="d-flex justify-content-center col-sm-4 p-2">
							{expedicionActiva && expedicionActivaModulo && privilegios.expedirPermisos && (
								<NuevoPermisoButton />
							)}
						</div>

						<div className="col-sm-8 d-inline-flex p-2 pr-4">
							<input
								type="text"
								className="form-control"
								placeholder="Número de permiso, número de cuenta o apellido paterno"
								name="palabra"
								autoComplete="off"
								value={palabra}
								onChange={handleInputChange}
								onKeyUp={handleKeyUp}
							/>

							<button
								className=" btn btn-outline-primary d-sm-block ml-auto"
								type="button"
								onClick={buscarPermisos}
							>
								<i className="fas fa-search"></i>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="row pt-3 pb-4">
				<div className="col-sm-8 pr-0 mt-3">
					<CustomTable
						title="Permisos"
						columns={permisosColumns}
						data={permisosFormateados}
						setFunction={startSetPermisoSelected}
					></CustomTable>
				</div>

				{permisoSelected && dataPermiso !== undefined ? (
					<div className="col-sm-4 mt-3">
						<div className="border border-info rounded detallePermiso">
							<div className="d-flex bg-light border-info border-bottom rounded-top p-1 justify-content-center font-weight-bold text-secondary pt-3">
								<h5>{dataPermiso.numeroPermiso}</h5>
							</div>
							<div className="row p-1 pl-2 pt-2">
								<div className="col-4">CUENTA:</div>
								<div className="col-8">{dataPermiso.cuenta}</div>
							</div>
							<div className="row p-1 pl-2">
								<div className="col-4">USUARIO:</div>
								<div className="col-8">{dataPermiso.usuario}</div>
							</div>
							<div className="row p-1 pl-2">
								<div className="col-4">PRODUCTOR:</div>
								<div className="col-8">{dataPermiso.nombreProductor}</div>
							</div>
							<div className="row p-1 pl-2">
								<div className="col-4">CULTIVO:</div>
								<div className="col-8">{dataPermiso.nombreCultivo}</div>
							</div>
							<div className="row p-1 pl-2">
								<div className="col-4">SUBCICLO:</div>
								<div className="col-8">{dataPermiso.subciclo}</div>
							</div>
							<div className="row p-1 pl-2">
								<div className="col-4">SUPERFICIE:</div>
								<div className="col-8">{dataPermiso.supAutorizada} ha</div>
							</div>
							<div className="row p-1 pl-2">
								<div className="col-4">DOTACION:</div>
								<div className="col-8">
									{roundToN(getDotacion(dataPermiso.sistema) * dataPermiso.supAutorizada, 3)} lts
								</div>
							</div>
							<div className="row p-1 pl-2">
								<div className="col-4">SISTEMA:</div>
								<div className="col-8">{dataPermiso.sistema}</div>
							</div>
							<div className="row p-1 pl-2">
								<div className="col-4">LOCALIDAD:</div>
								<div className="col-8">{dataPermiso.localidad}</div>
							</div>
							<div className="row p-1 pl-2">
								<div className="col-4">LOTE:</div>
								<div className="col-8">{dataPermiso.lote}</div>
							</div>
							<div className="row p-1 pl-2">
								<div className="col-4">SECCION:</div>
								<div className="col-8">{dataPermiso.seccion}</div>
							</div>
							<div className="row p-1 pl-2">
								<div className="col-4">MODULO:</div>
								<div className="col-8">{dataPermiso.modulo}</div>
							</div>
							<div className="row p-1 pl-2">
								<div className="col-4">EXPEDICION:</div>
								<div className="col-8">
									{moment(dataPermiso.fechaEmicion.toDate()).format("DD/MM/YYYY")}
								</div>
							</div>
							<div className="row p-1 pl-2">
								<div className="col-4">FECHA LIMITE:</div>
								<div className="col-8">
									{moment(dataPermiso.fechaLimite.toDate()).format("DD/MM/YYYY")}
								</div>
							</div>
							<div className="row p-1 pl-2">
								<div className="col-4">VIGENCIA:</div>
								<div className="col-8">
									{moment(dataPermiso.vigencia.toDate()).format("DD/MM/YYYY")}
								</div>
							</div>
							<div className="row p-1 pl-2">
								<div className="col-4">ESTADO:</div>
								<div className="col-8">{dataPermiso.estadoPermiso}</div>
							</div>

							<div className="row p-1 pl-2 pt-4 pb-4">
								<div className="col-4 d-flex justify-content-center">
									<button
										type="button"
										className="btn btn-sm btn-outline-info"
										onClick={handleOpenPrintPermisoModal}
									>
										<i className="fas fa-print"></i>
										<span> Imprimir</span>
									</button>
								</div>

								{cultivosConGuia.includes(dataPermiso.claveCultivo) &&
									dataPermiso.estadoPermiso === "activo" &&
									privilegios.solicitarGuias && (
										<div className="col-4 d-flex justify-content-center">
											{guia ? (
												<button
													type="button"
													className="btn btn-sm btn-outline-info"
													onClick={handleOpenPrintGuiaModal}
												>
													<i className="fas fa-file"></i>
													<span> Imprimir Guía</span>
												</button>
											) : (
												<button
													type="button"
													className="btn btn-sm btn-outline-info"
													onClick={startOpenGuiaForm}
												>
													<i className="fas fa-file"></i>
													<span> Generar Guía</span>
												</button>
											)}
										</div>
									)}

								<div className="col-4 d-flex justify-content-center">
									{dataPermiso.estadoPermiso === "activo" &&
										dataPermiso.permisoVinculado === null &&
										privilegios.solicitarCancelarPermisos && (
											<button
												type="button"
												className="btn btn-sm btn-outline-danger"
												onClick={cancelarPermiso}
											>
												<i className="fas fa-times"></i>
												<span> Cancelar</span>
											</button>
										)}
								</div>
							</div>
						</div>
					</div>
				) : (
					<div className="col-sm-4 mt-3">
						<div className="border border-info rounded detallePermiso">
							<SuperficiesChart />
						</div>
					</div>
				)}
			</div>

			{privilegios.cancelarPermisos && <PermitsCancellationModule />}

			<PrintPermisoModal data={dataPermisoImprecion} isNew={false} />

			{isGuiaPrintModalOpen && guia && <PrintGuiaModal />}

			<GuiaFormModal />
		</>
	);
};
