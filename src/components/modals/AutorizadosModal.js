import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
	closeAutorizadosModal,
	removeFormError,
	setAutorizados,
	setFormError
} from "../../actions/autorizadosScreen";
import { useForm } from "../../hooks/useForm";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		height: "430px",
		width: "1000px"
	}
};

Modal.setAppElement("#root");

export const AutorizadosModal = () => {
	const dispatch = useDispatch();

	const { openAutorizadosModal, autorizadoSelected, autorizados, formError } = useSelector(
		(state) => state.autorizadosScreen
	);

	const [formValues, handleInputChange] = useForm({
		clave: autorizadoSelected.clave,
		cultivo: autorizadoSelected.cultivo,
		gravedadNormalAutorizada: autorizadoSelected.gravedadNormalAutorizada,
		gravedadNormalAsignada: autorizadoSelected.gravedadNormalAsignada,
		gravedadExtraAutorizada: autorizadoSelected.gravedadExtraAutorizada,
		gravedadExtraAsignada: autorizadoSelected.gravedadExtraAsignada,
		pozoNormalAutorizada: autorizadoSelected.pozoNormalAutorizada,
		pozoNormalAsignada: autorizadoSelected.pozoNormalAsignada,
		pozoExtraAutorizada: autorizadoSelected.pozoExtraAutorizada,
		pozoExtraAsignada: autorizadoSelected.pozoExtraAsignada
	});

	const {
		clave,
		cultivo,
		gravedadNormalAutorizada,
		gravedadNormalAsignada,
		gravedadExtraAutorizada,
		gravedadExtraAsignada,
		pozoNormalAutorizada,
		pozoNormalAsignada,
		pozoExtraAutorizada,
		pozoExtraAsignada
	} = formValues;

	const closeModal = () => {
		dispatch(closeAutorizadosModal());
		dispatch(removeFormError());
	};

	const nuevosAutorizados = [];

	const startUpdateAutorizados = () => {
		if (isFormValid()) {
			autorizados.forEach((autorizado) => {
				if (autorizado.cultivo === autorizadoSelected.cultivo) {
					nuevosAutorizados.push({
						clave: clave,
						cultivo: cultivo,
						gravedadNormalAutorizada: Number(gravedadNormalAutorizada),
						gravedadNormalAsignada: Number(gravedadNormalAsignada),
						gravedadExtraAutorizada: Number(gravedadExtraAutorizada),
						gravedadExtraAsignada: Number(gravedadExtraAsignada),
						pozoNormalAutorizada: Number(pozoNormalAutorizada),
						pozoNormalAsignada: Number(pozoNormalAsignada),
						pozoExtraAutorizada: Number(pozoExtraAutorizada),
						pozoExtraAsignada: Number(pozoExtraAsignada)
					});
				} else {
					nuevosAutorizados.push(autorizado);
				}
			});
			dispatch(setAutorizados(nuevosAutorizados));
			dispatch(closeAutorizadosModal());
		}
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			startUpdateAutorizados();
		}
	};

	const isFormValid = () => {
		const valorNegativoError = "No se permiten valores negativos !";
		const supAsignadaError =
			"La superficie asignada no puede ser mayor a la superficie autorizada !";
		const valorVacioError = "Es necesario asignar un valor a todas las superficies !";

		if (Number(gravedadNormalAutorizada) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(gravedadNormalAsignada) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(gravedadExtraAutorizada) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(gravedadExtraAsignada) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(pozoNormalAutorizada) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(pozoNormalAsignada) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(pozoExtraAutorizada) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(pozoExtraAsignada) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (gravedadNormalAutorizada === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (gravedadNormalAsignada === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (gravedadExtraAutorizada === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (gravedadExtraAsignada === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (pozoNormalAutorizada === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (pozoNormalAsignada === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (pozoExtraAutorizada === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (pozoExtraAsignada === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (gravedadNormalAsignada > gravedadNormalAutorizada) {
			dispatch(setFormError(supAsignadaError));
			return false;
		} else if (gravedadExtraAsignada > gravedadExtraAutorizada) {
			dispatch(setFormError(supAsignadaError));
			return false;
		} else if (pozoNormalAsignada > pozoNormalAutorizada) {
			dispatch(setFormError(supAsignadaError));
			return false;
		} else if (pozoExtraAsignada > pozoExtraAutorizada) {
			dispatch(setFormError(supAsignadaError));
			return false;
		}

		dispatch(removeFormError());
		return true;
	};

	return (
		<Modal
			isOpen={openAutorizadosModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="autorizadosModal"
			overlayClassName="modal-fondo"
		>
			<form>
				<div className="row d-flex">
					<div className="col-sm-12 d-flex justify-content-center pt-2">
						<h5>{`${clave} - ${cultivo}`}</h5>
					</div>
				</div>
				{formError ? (
					<div className="row d-flex">
						<div className="col-sm-12 d-flex justify-content-center pt-2">
							<div className="border border-danger rounded text-danger p-2">{formError}</div>
						</div>
					</div>
				) : (
					<></>
				)}

				<div className="table-responsive">
					<table className="table table-borderless table-hover table-striped table-info mt-4 border-info text-secondary">
						<thead>
							<tr>
								<th scope="row"></th>
								<th colSpan="2">Superficie Normal</th>
								<th colSpan="2">Superficie Extra</th>
							</tr>
							<tr>
								<th scope="col">Sistema</th>
								<th scope="col">Autorizada</th>
								<th scope="col">Asignada</th>
								<th scope="col">Autorizada</th>
								<th scope="col">Asignada</th>
							</tr>
						</thead>

						<tbody>
							<tr>
								<th scope="row">Gravedad</th>
								<td>
									<input
										type="number"
										className="form-control"
										placeholder="Gravedad Normal Autorizada"
										name="gravedadNormalAutorizada"
										value={gravedadNormalAutorizada}
										autoComplete="off"
										onChange={handleInputChange}
										onKeyUp={handleKeyUp}
									/>
								</td>
								<td>
									<input
										type="number"
										className="form-control"
										placeholder="gravedad Normal Asignada"
										name="gravedadNormalAsignada"
										value={gravedadNormalAsignada}
										autoComplete="off"
										onChange={handleInputChange}
										onKeyUp={handleKeyUp}
									/>
								</td>
								<td>
									<input
										type="number"
										className="form-control"
										placeholder="Gravedad Extra Autorizada"
										name="gravedadExtraAutorizada"
										value={gravedadExtraAutorizada}
										autoComplete="off"
										onChange={handleInputChange}
										onKeyUp={handleKeyUp}
									/>
								</td>
								<td>
									<input
										type="number"
										className="form-control"
										placeholder="Gravedad Extra Asignada"
										name="gravedadExtraAsignada"
										value={gravedadExtraAsignada}
										autoComplete="off"
										onChange={handleInputChange}
										onKeyUp={handleKeyUp}
									/>
								</td>
							</tr>

							<tr>
								<th scope="row">Pozo Federal</th>
								<td>
									<input
										type="number"
										className="form-control"
										placeholder="Pozo Normal Autorizada"
										name="pozoNormalAutorizada"
										value={pozoNormalAutorizada}
										autoComplete="off"
										onChange={handleInputChange}
										onKeyUp={handleKeyUp}
									/>
								</td>
								<td>
									<input
										type="number"
										className="form-control"
										placeholder="Pozo Normal Asignada"
										name="pozoNormalAsignada"
										value={pozoNormalAsignada}
										autoComplete="off"
										onChange={handleInputChange}
										onKeyUp={handleKeyUp}
									/>
								</td>
								<td>
									<input
										type="number"
										className="form-control"
										placeholder="Pozo Extra Autorizada"
										name="pozoExtraAutorizada"
										value={pozoExtraAutorizada}
										autoComplete="off"
										onChange={handleInputChange}
										onKeyUp={handleKeyUp}
									/>
								</td>
								<td>
									<input
										type="number"
										className="form-control"
										placeholder="Pozo Extra Asignada"
										name="pozoExtraAsignada"
										value={pozoExtraAsignada}
										autoComplete="off"
										onChange={handleInputChange}
										onKeyUp={handleKeyUp}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="row d-flex">
					<div className="d-flex justify-content-center col-sm-12">
						<button
							type="button"
							className="btn btn-outline-primary"
							onClick={startUpdateAutorizados}
						>
							<i className="fas fa-check"></i>
						</button>
					</div>
				</div>
			</form>
		</Modal>
	);
};
