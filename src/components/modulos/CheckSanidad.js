import React from "react";
import { useEffect } from "react";
import { useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
	defineFolioSanidad,
	openSanidadModal,
	startLoadPermisosSearch
} from "../../actions/algodoneroScreen";
import { updatePermisoAlgodonero } from "../../helpers/updatePermisoAlgodonero";
import { laboresChecksReducer } from "../../reducers/laboresChecksReducer";
import { types } from "../../types/types";

export const CheckSanidad = ({ palabra }) => {
	const dispatch = useDispatch();

	const { permisos, permisoSelected } = useSelector((state) => state.algodoneroScreen);
	const { uid, privilegios, rol } = useSelector((state) => state.auth);
	const { registrarLabores, pagarLabores, imprimirLabores } = privilegios;

	const cuotaSanidad = 60;

	const dataPermiso = permisos.find((permiso) => permiso.id === permisoSelected);

	useEffect(() => {
		const state = setInitialState(dataPermiso);
		checksDispatch({ type: types.setCheckState, payload: state });
	}, [dataPermiso]);

	const [checksState, checksDispatch] = useReducer(
		laboresChecksReducer,
		setInitialState(dataPermiso)
	);

	const setUnset = (objeto) => {
		if (registrarLabores) {
			updatePermisoAlgodonero(permisoSelected, dataPermiso.modulo, "2020-2021", objeto);
			dispatch(startLoadPermisosSearch(uid, palabra));
		}
	};

	const checkUncheck = (editable, name, state) => {
		if (editable) {
			console.log(name);

			checksDispatch(getAction(name, state));
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
						<button
							className={`btn btn-sm ${
								dataPermiso.desfoliado ? "btn-success" : "btn-outline-success"
							}`}
							type="button"
							onClick={() => setUnset({ desfoliado: !dataPermiso.desfoliado })}
						>
							<i className="fas fa-check"></i>
						</button>
					</div>

					{/* <div className="col-8">
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
					</div> */}
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
					<div className="col-12 d-flex justify-content-center">
						{dataPermiso.pagado &&
							imprimirLabores &&
							(dataPermiso.folioSanidad ? (
								<button
									type="button"
									className="btn btn-outline-success"
									onClick={handleOpenSanidadModal}
								>
									<i className="fas fa-print"></i>
									<span> Imprimir Constancia</span>
								</button>
							) : (
								<button
									type="button"
									className="btn btn-outline-success"
									onClick={handleOpenSanidadModal}
								>
									<i className="fas fa-print"></i>
									<span> Generar Constancia</span>
								</button>
							))}
					</div>
				</div>

				{checksState.map((check) => (
					<div key={check.name} className="row p-1 pl-2 d-flex align-items-center">
						<div className="col-4">{check.tag}:</div>
						<div className="col-8">
							<button
								className={`btn btn-sm ${getStyle(check.state, check.editable)}`}
								type="button"
								onClick={() => checkUncheck(check.editable, check.name, check.state)}
							>
								<div>
									<i className="fas fa-check"></i>
								</div>
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

const getStyle = (state, editable) => {
	if (state === true) return "btn-success";
	else if (editable === true) return "btn-outline-success";
	else return "btn-outline-secondary";
};

const setInitialState = (permiso) => {
	const desfoliado = permiso.desfoliado ?? false;
	const cosechado = permiso.cosechado ?? false;
	const desvarado = permiso.desvarado ?? false;
	const disqueado = permiso.disqueado ?? false;
	const desarraigado = permiso.desarraigado ?? false;
	const barbechado = permiso.barbechado ?? false;
	const pagado = permiso.pagado ?? false;

	const state = [
		/* 0 */ { name: "desfoliado", tag: "DESFOLIADO", state: desfoliado, editable: false },
		/* 1 */ { name: "cosechado", tag: "COSECHADO", state: cosechado, editable: false },
		/* 2 */ { name: "desvarado", tag: "DESVARADO", state: desvarado, editable: false },
		/* 3 */ { name: "disqueado", tag: "DISQUEADO", state: disqueado, editable: false },
		/* 4 */ { name: "desarraigado", tag: "DESARRAIGADO", state: desarraigado, editable: false },
		/* 5 */ { name: "barbechado", tag: "BARBECHADO", state: barbechado, editable: false },
		/* 6 */ { name: "pagado", tag: "PAGADO", state: pagado, editable: false }
	];

	if (pagado) {
		state[6].editable = true;
		return state;
	} else if (barbechado) {
		state[5].editable = true;
		state[6].editable = true;
		return state;
	} else if (desarraigado) {
		state[4].editable = true;
		state[6].editable = true;
		return state;
	} else if (disqueado) {
		state[3].editable = true;
		state[4].editable = true;
		state[5].editable = true;
		return state;
	} else if (desvarado) {
		state[2].editable = true;
		state[3].editable = true;
		return state;
	} else if (cosechado) {
		state[1].editable = true;
		state[2].editable = true;
		return state;
	} else if (desfoliado) {
		state[0].editable = true;
		state[1].editable = true;
		return state;
	} else {
		state[0].editable = true;
		return state;
	}
};

const getAction = (name, state) => {
	if (state) {
		switch (name) {
			case "desfoliado":
				return { type: types.uncheckDesfoliado };
			case "cosechado":
				return { type: types.uncheckCosechado };
			case "desvarado":
				return { type: types.uncheckDesvarado };
			case "disqueado":
				return { type: types.uncheckDisqueado };
			case "desarraigado":
				return { type: types.uncheckDesarraigado };
			case "barbechado":
				return { type: types.uncheckBarbechado };
			case "pagado":
				return { type: types.uncheckPagado };

			default:
				return { type: "" };
		}
	} else {
		switch (name) {
			case "desfoliado":
				return { type: types.checkDesfoliado };
			case "cosechado":
				return { type: types.checkCosechado };
			case "desvarado":
				return { type: types.checkDesvarado };
			case "disqueado":
				return { type: types.checkDisqueado };
			case "desarraigado":
				return { type: types.checkDesarraigado };
			case "barbechado":
				return { type: types.checkBarbechado };
			case "pagado":
				return { type: types.checkPagado };

			default:
				return { type: "" };
		}
	}
};
/* 
	const initialState = [
		{ name: "desfoliado", tag: "DESFOLIADO", state: "false", editable: true },
	];

*/
