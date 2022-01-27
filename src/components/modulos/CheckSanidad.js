import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
	defineFolioSanidad,
	openSanidadModal,
	startLoadPermisosSearch
} from "../../actions/algodoneroScreen";
import { updatePermisoAlgodonero } from "../../helpers/updatePermisoAlgodonero";

export const CheckSanidad = ({ palabra }) => {
	const dispatch = useDispatch();

	const { permisos, permisoSelected } = useSelector((state) => state.algodoneroScreen);
	const { uid, privilegios, rol } = useSelector((state) => state.auth);
	const { registrarLabores, pagarLabores, imprimirLabores } = privilegios;

	let dataPermiso;

	const cuotaSanidad = 60;

	permisos.forEach((permiso) => {
		if (permiso.id === permisoSelected) {
			dataPermiso = permiso;
		}
	});

	const setUnset = (objeto, e) => {
		if (registrarLabores) {
			e.preventDefault();
			updatePermisoAlgodonero(permisoSelected, dataPermiso.modulo, "2020-2021", objeto);
			dispatch(startLoadPermisosSearch(uid, palabra));
		}
	};

	const setUnsetPago = (objeto, e) => {
		if (pagarLabores) {
			e.preventDefault();
			updatePermisoAlgodonero(permisoSelected, dataPermiso.modulo, "2020-2021", objeto);
			dispatch(startLoadPermisosSearch(rol === "tecnicoCESVBC" ? uid : 0, palabra));
		}
	};

	const addSuperficieMapeada = (superficieActual) => {
		Swal.fire({
			title: "Actualizar superficie mapeada",
			input: "text",
			inputPlaceholder: superficieActual,
			inputAttributes: {
				autocapitalize: "off"
			},
			showCancelButton: true,
			confirmButtonText: "Guardar",
			cancelButtonText: "Cancelar"
		}).then((result) => {
			if (result.isConfirmed) {
				updatePermisoAlgodonero(permisoSelected, dataPermiso.modulo, "2020-2021", {
					superficieMapeada: Number(result.value)
				});
				dispatch(startLoadPermisosSearch(rol === "tecnicoCESVBC" ? uid : 0, palabra));
				Swal.fire("OK", `Se actualiso la superficie mapeada`, "success");
			}
		});
	};

	const addFolioFisico = (folio) => {
		Swal.fire({
			title: "Folio de constancia física:",
			input: "text",
			inputPlaceholder: folio,
			inputAttributes: {
				autocapitalize: "off"
			},
			showCancelButton: true,
			confirmButtonText: "Guardar",
			cancelButtonText: "Cancelar"
		}).then((result) => {
			if (result.isConfirmed) {
				updatePermisoAlgodonero(permisoSelected, dataPermiso.modulo, "2020-2021", {
					folioConstaniciaFisica: result.value
				});
				dispatch(startLoadPermisosSearch(rol === "tecnicoCESVBC" ? uid : 0, palabra));
				Swal.fire("OK", `Se guardó el folio de la constancia.`, "success");
			}
		});
	};

	const formatter = new Intl.NumberFormat("es-MX", {
		style: "currency",
		currency: "MXN"
	});

	const handleOpenSanidadModal = () => {
		dispatch(openSanidadModal());
		dispatch(defineFolioSanidad("2020-2021"));
	};

	// TODO: Asignar folio de constancia fitosanitaria al expedir permiso de algodon

	return (
		<div className="col-sm-4 mt-3">
			<div className="border border-info rounded detallePermiso">
				<div className="d-flex bg-light border-info border-bottom rounded-top p-1 justify-content-center font-weight-bold text-secondary pt-3">
					<h5>{dataPermiso.folio}</h5>
				</div>
				<div className="row p-1 pl-2 pt-2">
					<div className="col-4">CUENTA:</div>
					<div className="col-8">{dataPermiso.cuenta}</div>
				</div>
				<div className="row p-1 pl-2">
					<div className="col-4">USUARIO:</div>
					<div className="col-8">{dataPermiso.nombre}</div>
				</div>

				<div className="row p-1 pl-2">
					<div className="col-4">SUPERFICIE:</div>
					<div className="col-8">{dataPermiso.superficie} ha</div>
				</div>

				<div className="row border rounded m-2 p-2 d-flex align-items-center">
					<div className="col-6 ">SUPERFICIE MAPEADA:</div>
					<div className="col-3">{dataPermiso.superficieMapeada} Ha</div>
					<div className="col-3">
						{registrarLabores && (
							<button
								className=" btn btn-outline-primary btn-sm "
								type="button"
								onClick={() => addSuperficieMapeada(dataPermiso.superficieMapeada)}
							>
								<i className="fas fa-edit"></i>
							</button>
						)}
					</div>
				</div>

				<div className="row border rounded m-2 p-2 d-flex align-items-center">
					<div className="col-6 ">FOLIO DE CONSTANCIA FÍSICA:</div>
					<div className="col-3">{dataPermiso.folioConstaniciaFisica}</div>
					<div className="col-3">
						{registrarLabores && (
							<button
								className=" btn btn-outline-primary btn-sm "
								type="button"
								onClick={() => addFolioFisico(dataPermiso.folioConstaniciaFisica ?? "")}
							>
								<i className="fas fa-edit"></i>
							</button>
						)}
					</div>
				</div>

				<div className="row p-1 pl-2">
					<div className="col-4">LOTE:</div>
					<div className="col-8">{dataPermiso.lote}</div>
				</div>
				<div className="row p-1 pl-2">
					<div className="col-4">LOCALIDAD:</div>
					<div className="col-8">{dataPermiso.ubicacion}</div>
				</div>
				<div className="row p-1 pl-2">
					<div className="col-4">MODULO:</div>
					<div className="col-8">{dataPermiso.modulo}</div>
				</div>

				<div className="row p-1 pl-2 d-flex align-items-center">
					<div className="col-4">DESFOLIADO:</div>
					<div className="col-8">
						{dataPermiso.desfoliado ? (
							<button
								className=" btn btn-success btn-sm "
								type="button"
								onClick={(e) => setUnset({ desfoliado: false }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						) : (
							<button
								className=" btn btn-outline-success btn-sm "
								type="button"
								onClick={(e) => setUnset({ desfoliado: true }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						)}
					</div>
				</div>

				<div className="row p-1 pl-2 d-flex align-items-center">
					<div className="col-4">COSECHADO:</div>
					<div className="col-8">
						{dataPermiso.cosechado ? (
							<button
								className=" btn btn-success btn-sm "
								type="button"
								onClick={(e) => setUnset({ cosechado: false }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						) : dataPermiso.desfoliado ? (
							<button
								className=" btn btn-outline-success btn-sm "
								type="button"
								onClick={(e) => setUnset({ cosechado: true }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						) : (
							<button className=" btn btn-outline-secondary btn-sm " type="button">
								<i className="fas fa-check"></i>
							</button>
						)}
					</div>
				</div>

				<div className="row p-1 pl-2 d-flex align-items-center">
					<div className="col-4">DESVARADO:</div>
					<div className="col-8">
						{dataPermiso.desvarado ? (
							<button
								className=" btn btn-success btn-sm "
								type="button"
								onClick={(e) => setUnset({ desvarado: false }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						) : dataPermiso.cosechado ? (
							<button
								className=" btn btn-outline-success btn-sm "
								type="button"
								onClick={(e) => setUnset({ desvarado: true }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						) : (
							<button className=" btn btn-outline-secondary btn-sm " type="button">
								<i className="fas fa-check"></i>
							</button>
						)}
					</div>
				</div>

				<div className="row p-1 pl-2 d-flex align-items-center">
					<div className="col-4">DISQUEADO:</div>
					<div className="col-8">
						{dataPermiso.disqueado ? (
							<button
								className=" btn btn-success btn-sm "
								type="button"
								onClick={(e) => setUnset({ disqueado: false }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						) : dataPermiso.desvarado ? (
							<button
								className=" btn btn-outline-success btn-sm "
								type="button"
								onClick={(e) => setUnset({ disqueado: true }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						) : (
							<button className=" btn btn-outline-secondary btn-sm " type="button">
								<i className="fas fa-check"></i>
							</button>
						)}
					</div>
				</div>

				<div className="row p-1 pl-2 d-flex align-items-center">
					<div className="col-4">DESARRAIGADO:</div>
					<div className="col-8">
						{dataPermiso.desarraigado ? (
							<button
								className=" btn btn-success btn-sm "
								type="button"
								onClick={(e) => setUnset({ desarraigado: false }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						) : dataPermiso.disqueado ? (
							<button
								className=" btn btn-outline-success btn-sm "
								type="button"
								onClick={(e) => setUnset({ desarraigado: true }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						) : (
							<button className=" btn btn-outline-secondary btn-sm " type="button">
								<i className="fas fa-check"></i>
							</button>
						)}
					</div>
				</div>

				<div className="row p-1 pl-2 d-flex align-items-center">
					<div className="col-4">BARBECHADO:</div>
					<div className="col-8">
						{dataPermiso.barbechado ? (
							<button
								className=" btn btn-success btn-sm "
								type="button"
								onClick={(e) => setUnset({ barbechado: false }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						) : dataPermiso.disqueado ? (
							<button
								className=" btn btn-outline-success btn-sm "
								type="button"
								onClick={(e) => setUnset({ barbechado: true }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						) : (
							<button className=" btn btn-outline-secondary btn-sm " type="button">
								<i className="fas fa-check"></i>
							</button>
						)}
					</div>
				</div>

				<div className="row p-1 pl-2">
					<div className="col-4">MONTO A PAGAR:</div>
					<div className="col-8">
						{formatter.format(dataPermiso.superficieMapeada * cuotaSanidad)} MN
					</div>
				</div>

				<div className="row p-1 pl-2 d-flex align-items-center">
					<div className="col-4">PAGADO:</div>
					<div className="col-8">
						{dataPermiso.pagado ? (
							<button
								className=" btn btn-success btn-sm "
								type="button"
								onClick={(e) => setUnsetPago({ pagado: false, laboresPendientes: true }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						) : (dataPermiso.desarraigado || dataPermiso.barbechado) && pagarLabores ? (
							<button
								className=" btn btn-outline-success btn-sm "
								type="button"
								onClick={(e) => setUnsetPago({ pagado: true, laboresPendientes: false }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						) : (
							<button className=" btn btn-outline-secondary btn-sm " type="button">
								<i className="fas fa-check"></i>
							</button>
						)}
					</div>
				</div>

				<div className="row pt-3 pl-2">
					<div className={`col-12 ${!dataPermiso.laboresPendientes && "text-success"}`}>
						{dataPermiso.laboresPendientes
							? "CUENTA BLOQUEADA PARA EXPEDICIÓN"
							: "CUENTA LIBERADA PARA EXPEDICIÓN"}
					</div>
				</div>

				<div className="row p-1 pl-2 pt-4 pb-4">
					<div className="col-6 d-flex justify-content-center">
						{dataPermiso.pagado && imprimirLabores ? (
							<button
								type="button"
								className="btn btn-outline-success"
								onClick={handleOpenSanidadModal}
							>
								<i className="fas fa-print"></i>
								<span> Imprimir</span>
							</button>
						) : (
							<></>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
