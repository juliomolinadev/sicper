import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { startLoadPermisos, openSanidadModal } from "../../actions/algodoneroScreen";
import { updatePermisoAlgodonero } from "../../helpers/updatePermisoAlgodonero";

export const CheckSanidad = () => {
	const dispatch = useDispatch();

	const { permisos, permisoSelected } = useSelector((state) => state.algodoneroScreen);

	let dataPermiso;

	const cuotaSanidad = 20;

	permisos.forEach((permiso) => {
		if (permiso.id === permisoSelected) {
			dataPermiso = permiso;
		}
	});

	const ciclo = "2020-2021";

	const setUnset = (objeto, e) => {
		e.preventDefault();
		updatePermisoAlgodonero(permisoSelected, dataPermiso.modulo, ciclo, objeto);
		dispatch(startLoadPermisos());
	};

	const addSuperficieMapeada = (superficieActual) => {
		Swal.fire({
			title: "Actualizar superficie mapeada",
			input: "number",
			inputPlaceholder: superficieActual,
			inputAttributes: {
				autocapitalize: "off"
			},
			showCancelButton: true,
			confirmButtonText: "Guardar",
			cancelButtonText: "Cancelar"
		}).then((result) => {
			if (result.isConfirmed) {
				updatePermisoAlgodonero(permisoSelected, dataPermiso.modulo, ciclo, {
					superficieMapeada: result.value
				});
				dispatch(startLoadPermisos());
				Swal.fire("OK", `Se actualiso la superficie mapeada`, "success");
			}
		});
	};

	const formatter = new Intl.NumberFormat("es-MX", {
		style: "currency",
		currency: "MXN"
		// minimumFractionDigits: 0
	});

	const handleOpenSanidadModal = () => {
		dispatch(openSanidadModal());
	};

	// TODO: Asignar folio de constancia fitosanitaria al expedir permiso de algodon

	return (
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
					<div className="col-4">SUPERFICIE:</div>
					<div className="col-8">{dataPermiso.supAutorizada} ha</div>
				</div>

				<div className="row p-1 pl-2">
					<div className="col-4">LOTE:</div>
					<div className="col-8">{dataPermiso.lote}</div>
				</div>
				<div className="row p-1 pl-2">
					<div className="col-4">LOCALIDAD:</div>
					<div className="col-8">{dataPermiso.localidad}</div>
				</div>
				<div className="row p-1 pl-2">
					<div className="col-4">SECCION:</div>
					<div className="col-8">{dataPermiso.seccion}</div>
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
							<button
								className=" btn btn-outline-secondary btn-sm "
								type="button"
								// onClick={setError}
							>
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
							<button
								className=" btn btn-outline-secondary btn-sm "
								type="button"
								// onClick={setError}
							>
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
							<button
								className=" btn btn-outline-secondary btn-sm "
								type="button"
								// onClick={setError}
							>
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
							<button
								className=" btn btn-outline-secondary btn-sm "
								type="button"
								// onClick={setError}
							>
								<i className="fas fa-check"></i>
							</button>
						)}
					</div>
				</div>

				{dataPermiso.desarraigado ? (
					<div className="row border rounded m-2 p-2 d-flex align-items-center">
						<div className="col-6 ">SUPERFICIE MAPEADA:</div>
						<div className="col-3">{dataPermiso.superficieMapeada} Ha</div>
						<div className="col-3">
							<button
								className=" btn btn-outline-primary btn-sm "
								type="button"
								onClick={() => addSuperficieMapeada(dataPermiso.superficieMapeada)}
							>
								<i className="fas fa-plus"></i>
							</button>
						</div>
					</div>
				) : (
					<></>
				)}

				<div className="row p-1 pl-2">
					<div className="col-4">MONTO A PAGAR:</div>
					<div className="col-8">
						{formatter.format(dataPermiso.supAutorizada * cuotaSanidad)} MN
					</div>
				</div>

				<div className="row p-1 pl-2 d-flex align-items-center">
					<div className="col-4">PAGADO:</div>
					<div className="col-8">
						{dataPermiso.pagado ? (
							<button
								className=" btn btn-success btn-sm "
								type="button"
								onClick={(e) => setUnset({ pagado: false }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						) : dataPermiso.desarraigado ? (
							<button
								className=" btn btn-outline-success btn-sm "
								type="button"
								onClick={(e) => setUnset({ pagado: true }, e)}
							>
								<i className="fas fa-check"></i>
							</button>
						) : (
							<button
								className=" btn btn-outline-secondary btn-sm "
								type="button"
								// onClick={setError}
							>
								<i className="fas fa-check"></i>
							</button>
						)}
					</div>
				</div>

				<div className="row p-1 pl-2 pt-4 pb-4">
					<div className="col-6 d-flex justify-content-center">
						{dataPermiso.pagado ? (
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
