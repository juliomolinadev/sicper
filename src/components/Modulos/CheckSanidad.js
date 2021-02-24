import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { startLoadPermisos } from "../../actions/algodoneroScreen";
import { updatePermisoAlgodonero } from "../../helpers/updatePermisoAlgodonero";

export const CheckSanidad = () => {
	const dispatch = useDispatch();

	const { permisos, permisoSelected } = useSelector((state) => state.algodoneroScreen);

	let dataPermiso;

	permisos.forEach((permiso) => {
		if (permiso.id === permisoSelected) {
			dataPermiso = permiso;
		}
	});

	const ciclo = "2020-2021";

	const activarPermiso = () => {
		Swal.fire({
			title: "Atención!!",
			text: `Está a punto de activar el permiso ${dataPermiso.numeroPermiso}, ¿Realmente desea activar este permiso?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si",
			cancelButtonText: "No"
		}).then((result) => {
			if (result.isConfirmed) {
				updatePermisoAlgodonero(permisoSelected, dataPermiso.modulo, ciclo);
				dispatch(startLoadPermisos());
				Swal.fire(
					"OK",
					`El permiso ${dataPermiso.numeroPermiso} fue activado con exito`,
					"success"
				);
			}
		});
	};

	const setUnset = (objeto, e) => {
		e.preventDefault();
		console.log(objeto);
		updatePermisoAlgodonero(permisoSelected, dataPermiso.modulo, ciclo, objeto);
		dispatch(startLoadPermisos());
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

				<div className="row p-1 pl-2">
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

				<div className="row p-1 pl-2">
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

				<div className="row p-1 pl-2">
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

				<div className="row p-1 pl-2">
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

				<div className="row p-1 pl-2">
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

				<div className="row p-1 pl-2 pt-4 pb-4">
					<div className="col-6 d-flex justify-content-center">
						{dataPermiso.estadoPermiso === "pendiente" ? (
							<button type="button" className="btn btn-outline-success" onClick={activarPermiso}>
								<i className="fas fa-check"></i>
								<span> Activar</span>
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
