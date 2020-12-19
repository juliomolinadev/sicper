import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeAutorizadosModal, setAutorizados } from "../../actions/autorizadosScreen";
import { useForm } from "../../hooks/useForm";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		height: "60px",
		width: "1000px"
	}
};

Modal.setAppElement("#root");

export const AutorizadosModal = () => {
	const dispatch = useDispatch();

	const { openAutorizadosModal, autorizadoSelected, autorizados } = useSelector(
		(state) => state.autorizadosScreen
	);

	const [formValues, handleInputChange] = useForm({
		cultivo: autorizadoSelected.cultivo,
		normal: autorizadoSelected.normal,
		extra: autorizadoSelected.extra,
		disponible: autorizadoSelected.disponible
	});

	const { cultivo, normal, extra, disponible } = formValues;

	const closeModal = () => {
		dispatch(closeAutorizadosModal());
	};

	const nuevosAutorizados = [];

	const startUpdateAutorizados = () => {
		autorizados.forEach((autorizado) => {
			if (autorizado.cultivo === autorizadoSelected.cultivo) {
				nuevosAutorizados.push({
					cultivo: cultivo,
					normal: Number(normal),
					extra: Number(extra),
					disponible: Number(disponible)
				});
			} else {
				nuevosAutorizados.push(autorizado);
			}
		});
		dispatch(setAutorizados(nuevosAutorizados));
		dispatch(closeAutorizadosModal());
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			startUpdateAutorizados();
		}
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
			<form className="row">
				<div className="d-flex justify-content-center col-sm-3">
					<div className="col-form-label">{cultivo}</div>
				</div>

				<div className="form-group d-flex align-items-baseline col-sm-3">
					<label htmlFor="">Normal: </label>
					<div className="flex-grow-1 pl-1">
						<input
							type="number"
							className="form-control"
							placeholder="Normal"
							name="normal"
							value={normal}
							autoComplete="off"
							onChange={handleInputChange}
							onKeyUp={handleKeyUp}
						/>
					</div>
				</div>

				<div className="form-group d-flex align-items-baseline col-sm-2">
					<label htmlFor="">Extra: </label>
					<div className="flex-grow-1 pl-1">
						<input
							type="number"
							className="form-control"
							placeholder="Extra"
							name="extra"
							value={extra}
							autoComplete="off"
							onChange={handleInputChange}
							onKeyUp={handleKeyUp}
						/>
					</div>
				</div>

				<div className="form-group d-flex align-items-baseline col-sm-3">
					<label htmlFor="">Asignada: </label>
					<div className="flex-grow-1 pl-1">
						<input
							type="number"
							className="form-control"
							placeholder="Asignada"
							name="disponible"
							value={disponible}
							autoComplete="off"
							onChange={handleInputChange}
							onKeyUp={handleKeyUp}
						/>
					</div>
				</div>

				<div
					className="d-block justify-content-center col-sm-1"
					// onClick={handleOpenPrintPermisoModal}
				>
					<button
						type="button"
						className="btn btn-outline-primary"
						onClick={startUpdateAutorizados}
					>
						<i className="fas fa-check"></i>
					</button>
				</div>
			</form>
		</Modal>
	);
};
