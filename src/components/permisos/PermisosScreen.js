import React from "react";
// import { PermisosTable } from "../tables/PermisosTable";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "../tables/CustomTable";
import { permisosColumns } from "../tables/configTables";
import { startLoadPermisos, setPermisoSelected } from "../../actions/permisosScreen";
import { openPrintPermisoModal } from "../../actions/altaPermisos";
import { useDispatch, useSelector } from "react-redux";
import { PrintPermisoModal } from "../modals/PrintPermisoModal";

export const PermisosScreen = () => {
	const dispatch = useDispatch();

	const { permisos, permisoSelected } = useSelector((state) => state.permisosScreen);

	if (permisos.length === 0) {
		dispatch(startLoadPermisos());
	}

	let dataPermiso = {};
	permisos.forEach((permiso) => {
		if (permiso.id === permisoSelected) {
			dataPermiso = permiso;
		}
	});

	const handleOpenPrintPermisoModal = () => {
		dispatch(openPrintPermisoModal());
	};

	return (
		<>
			<div className="row pt-5">
				<div className="col-sm-8 pr-4">
					<div className="row d-flex">
						<div className="col-sm-4">
							<Link to="/nuevo-permiso">
								<button className="btn btn-outline-primary" type="button">
									<span>Nuevo Permiso </span>
									<i className="fas fa-plus"></i>
								</button>
							</Link>
						</div>

						<div className="col-sm-8 d-inline-flex">
							<input
								type="text"
								className="form-control"
								placeholder="Apellido paterno o numero de cuenta"
								name="usuario"
								autoComplete="off"
								// value={usuario}
								// onChange={handleInputChange}
								// onKeyDown={handleKeyDown}
							/>

							<button
								className=" btn btn-outline-primary d-sm-block ml-auto"
								type="button"
								// onClick={handleOpenUsuariosModal}
							>
								<i className="fas fa-search"></i>
							</button>
						</div>
					</div>
				</div>
			</div>

			<div className="row pt-3 pb-4 pr-3">
				<div className="col-sm-8">
					{/* <PermisosTable /> */}
					<CustomTable
						title="Permisos"
						columns={permisosColumns}
						data={permisos}
						setFunction={setPermisoSelected}
						// closeFunction={closeFunction}
					></CustomTable>
				</div>

				{permisoSelected ? (
					<div className="col-sm-4 border border-info rounded detallePermiso">
						<div className="row bg-light border-info border-bottom rounded-top p-1 justify-content-center font-weight-bold text-secondary pt-3">
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
							<div className="col-8">{dataPermiso.dotacion * dataPermiso.supAutorizada} lts</div>
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
							<div className="col-8">{dataPermiso.fechaEmicion}</div>
						</div>
						<div className="row p-1 pl-2">
							<div className="col-4">FECHA LIMITE:</div>
							<div className="col-8">{dataPermiso.fechaLimite}</div>
						</div>
						<div className="row p-1 pl-2">
							<div className="col-4">VIGENCIA:</div>
							<div className="col-8">{dataPermiso.vigencia}</div>
						</div>
						<div className="row p-1 pl-2">
							<div className="col-4">ESTADO:</div>
							<div className="col-8">{dataPermiso.estadoPermiso}</div>
						</div>
						<div className="row p-1 pl-2 pt-4 pb-4">
							<div className="col-6 d-flex justify-content-center">
								<button
									type="button"
									className="btn btn-outline-info"
									onClick={handleOpenPrintPermisoModal}
								>
									<i className="fas fa-print"></i>
									<span> Imprimir</span>
								</button>
							</div>
							<div className="col-6 d-flex justify-content-center">
								<button
									type="button"
									className="btn btn-outline-danger"
									// onClick={closeModal}
								>
									<i className="fas fa-times"></i>
									<span> Cancelar</span>
								</button>
							</div>
						</div>
					</div>
				) : (
					<></>
				)}
			</div>
			<PrintPermisoModal data={dataPermiso} />
		</>
	);
};
