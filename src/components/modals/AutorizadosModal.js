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
		normalGravedad: autorizadoSelected.normalGravedad,
		extraGravedad: autorizadoSelected.extraGravedad,
		asignadaGravedad: autorizadoSelected.asignadaGravedad,
		normalPozoFederal: autorizadoSelected.normalPozoFederal,
		extraPozoFederal: autorizadoSelected.extraPozoFederal,
		asignadaPozoFederal: autorizadoSelected.asignadaPozoFederal,
		normalPozoParticular: autorizadoSelected.normalPozoParticular,
		extraPozoParticular: autorizadoSelected.extraPozoParticular,
		asignadaPozoParticular: autorizadoSelected.asignadaPozoParticular
	});

	const {
		clave,
		cultivo,
		normalGravedad,
		extraGravedad,
		asignadaGravedad,
		normalPozoFederal,
		extraPozoFederal,
		asignadaPozoFederal,
		normalPozoParticular,
		extraPozoParticular,
		asignadaPozoParticular
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
						normalGravedad: Number(normalGravedad),
						extraGravedad: Number(extraGravedad),
						asignadaGravedad: Number(asignadaGravedad),
						normalPozoFederal: Number(normalPozoFederal),
						extraPozoFederal: Number(extraPozoFederal),
						asignadaPozoFederal: Number(asignadaPozoFederal),
						normalPozoParticular: Number(normalPozoParticular),
						extraPozoParticular: Number(extraPozoParticular),
						asignadaPozoParticular: Number(asignadaPozoParticular)
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
			"La superficie asignada no puede ser mayor a la suma de la superficie normal y extra !";
		const valorVacioError = "Es necesario asignar un valor a todas las superficies !";

		if (Number(normalGravedad) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(extraGravedad) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(asignadaGravedad) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(normalPozoFederal) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(extraPozoFederal) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(asignadaPozoFederal) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(normalPozoParticular) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(extraPozoParticular) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(asignadaPozoParticular) < 0) {
			dispatch(setFormError(valorNegativoError));
			return false;
		} else if (Number(normalGravedad) + Number(extraGravedad) < Number(asignadaGravedad)) {
			console.log("Es en gravedad: ", normalGravedad + extraGravedad);
			console.log("normalGravedad en lugar: ", normalGravedad);
			console.log("extraGravedad en lugar: ", extraGravedad);
			console.log("asignadaGravedad en lugar: ", asignadaGravedad);
			dispatch(setFormError(supAsignadaError));
			return false;
		} else if (Number(normalPozoFederal) + Number(extraPozoFederal) < Number(asignadaPozoFederal)) {
			console.log("Es en pozo federal");
			dispatch(setFormError(supAsignadaError));
			return false;
		} else if (
			Number(normalPozoParticular) + Number(extraPozoParticular) <
			Number(asignadaPozoParticular)
		) {
			console.log("Es en pozo particular");
			dispatch(setFormError(supAsignadaError));
			return false;
		} else if (normalGravedad === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (extraGravedad === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (asignadaGravedad === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (normalPozoFederal === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (extraPozoFederal === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (asignadaPozoFederal === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (normalPozoParticular === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (extraPozoParticular === "") {
			dispatch(setFormError(valorVacioError));
			return false;
		} else if (asignadaPozoParticular === "") {
			dispatch(setFormError(valorVacioError));
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

				<table className="table table-hover table-striped table-info mt-4 border-info text-secondary">
					<thead>
						<tr>
							<th scope="col">Sistema</th>
							<th scope="col">Sup Normal</th>
							<th scope="col">Sup Extra</th>
							<th scope="col">Sup Asignada</th>
						</tr>
					</thead>

					<tbody>
						<tr>
							<th scope="row">Gravedad</th>
							<td>
								<input
									type="number"
									className="form-control"
									placeholder="Normal Gravedad"
									name="normalGravedad"
									value={normalGravedad}
									autoComplete="off"
									onChange={handleInputChange}
									onKeyUp={handleKeyUp}
								/>
							</td>
							<td>
								<input
									type="number"
									className="form-control"
									placeholder="Extra Gravedad"
									name="extraGravedad"
									value={extraGravedad}
									autoComplete="off"
									onChange={handleInputChange}
									onKeyUp={handleKeyUp}
								/>
							</td>
							<td>
								<input
									type="number"
									className="form-control"
									placeholder="Asignada Gravedad"
									name="asignadaGravedad"
									value={asignadaGravedad}
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
									placeholder="Normal Pozo Federal"
									name="normalPozoFederal"
									value={normalPozoFederal}
									autoComplete="off"
									onChange={handleInputChange}
									onKeyUp={handleKeyUp}
								/>
							</td>
							<td>
								<input
									type="number"
									className="form-control"
									placeholder="Extra Pozo Federal"
									name="extraPozoFederal"
									value={extraPozoFederal}
									autoComplete="off"
									onChange={handleInputChange}
									onKeyUp={handleKeyUp}
								/>
							</td>
							<td>
								<input
									type="number"
									className="form-control"
									placeholder="Asignada Pozo Federal"
									name="asignadaPozoFederal"
									value={asignadaPozoFederal}
									autoComplete="off"
									onChange={handleInputChange}
									onKeyUp={handleKeyUp}
								/>
							</td>
						</tr>

						<tr>
							<th scope="row">Pozo Particular</th>
							<td>
								<input
									type="number"
									className="form-control"
									placeholder="Normal Pozo Particular"
									name="normalPozoParticular"
									value={normalPozoParticular}
									autoComplete="off"
									onChange={handleInputChange}
									onKeyUp={handleKeyUp}
								/>
							</td>
							<td>
								<input
									type="number"
									className="form-control"
									placeholder="Extra Pozo Particular"
									name="extraPozoParticular"
									value={extraPozoParticular}
									autoComplete="off"
									onChange={handleInputChange}
									onKeyUp={handleKeyUp}
								/>
							</td>
							<td>
								<input
									type="number"
									className="form-control"
									placeholder="Asignada Pozo Particular"
									name="asignadaPozoParticular"
									value={asignadaPozoParticular}
									autoComplete="off"
									onChange={handleInputChange}
									onKeyUp={handleKeyUp}
								/>
							</td>
						</tr>
					</tbody>
				</table>
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
