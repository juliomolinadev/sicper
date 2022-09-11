import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
	closeAutorizadosModal,
	removeFormError,
	setAutorizados,
	setFormError
} from "../../actions/autorizadosScreen";
import { roundToN } from "../../helpers/functions/roundToN";
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

	const { expedicion } = useSelector((state) => state.sicperScreen);
	const cultivoExpedicion = expedicion.find(
		(cultivo) => cultivo.id === `${autorizadoSelected.clave}-${autorizadoSelected.cultivo}`
	);

	const gravedadNormal = cultivoExpedicion ? cultivoExpedicion.gravedadNormal : 0;
	const gravedadExtra = cultivoExpedicion ? cultivoExpedicion.gravedadExtra : 0;
	const pozoNormal = cultivoExpedicion ? cultivoExpedicion.pozoNormal : 0;
	const pozoExtra = cultivoExpedicion ? cultivoExpedicion.pozoExtra : 0;

	const [formValues, handleInputChange] = useForm({
		clave: autorizadoSelected.clave,
		cultivo: autorizadoSelected.cultivo,
		subciclo: autorizadoSelected.subciclo,
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
		subciclo,
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
						subciclo: subciclo,
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
		const superficieExcedida =
			"La superficie asignada no puede ser menor que la superficie expedida !";

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
		} else if (gravedadExtraAsignada - gravedadExtra < 0) {
			dispatch(setFormError(superficieExcedida));
			return false;
		} else if (roundToN(gravedadNormalAsignada, 4) - roundToN(gravedadNormal, 4) < 0) {
			dispatch(setFormError(superficieExcedida));
			return false;
		} else if (pozoNormalAsignada - pozoNormal < 0) {
			dispatch(setFormError(superficieExcedida));
			return false;
		} else if (pozoExtraAsignada - pozoExtra < 0) {
			dispatch(setFormError(superficieExcedida));
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
								<th scope="col">Expedida</th>
								<th scope="col">Disponible</th>
								<th scope="col">Autorizada</th>
								<th scope="col">Asignada</th>
								<th scope="col">Expedida</th>
								<th scope="col">Disponible</th>
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
								<td>{roundToN(gravedadNormal, 4)}</td>
								<td>
									{roundToN(Number(gravedadNormalAsignada), 4) -
										roundToN(Number(gravedadNormal), 4)}
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
								<td>{roundToN(gravedadExtra, 4)}</td>
								<td>
									{roundToN(Number(gravedadExtraAsignada), 4) - roundToN(Number(gravedadExtra), 4)}
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
								<td>{roundToN(pozoNormal, 4)}</td>
								<td>{roundToN(Number(pozoNormalAsignada), 4) - roundToN(Number(pozoNormal), 4)}</td>

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
								<td>{roundToN(pozoExtra, 4)}</td>
								<td>{roundToN(Number(pozoExtraAsignada), 4) - roundToN(Number(pozoExtra), 4)}</td>
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
