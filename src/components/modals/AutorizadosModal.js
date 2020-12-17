import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeAutorizadosModal } from "../../actions/autorizadosScreen";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		height: "60px"
	}
};

Modal.setAppElement("#root");

export const AutorizadosModal = () => {
	const dispatch = useDispatch();

	const { openAutorizadosModal } = useSelector((state) => state.autorizadosScreen);

	const closeModal = () => {
		dispatch(closeAutorizadosModal());
	};

	return (
		<Modal
			isOpen={openAutorizadosModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal autorizadosModal"
			overlayClassName="modal-fondo"
		>
			<form className="row">
				<div className="col-sm-3">
					<div className="col-form-label">Cultivo</div>
				</div>

				<div className="form-group d-flex align-items-baseline col-sm-3">
					<label htmlFor="">Normal:</label>
					<div className="flex-grow-1 ">
						<input
							type="text"
							className="form-control"
							placeholder="variedad"
							name="variedad"
							// value={variedad}
							autoComplete="off"
							// onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="form-group d-flex align-items-baseline col-sm-3">
					<label htmlFor="">Extra:</label>
					<div className="flex-grow-1 ">
						<input
							type="text"
							className="form-control"
							placeholder="variedad"
							name="variedad"
							// value={variedad}
							autoComplete="off"
							// onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="form-group d-flex align-items-baseline col-sm-3">
					<label htmlFor="">Disponible:</label>
					<div className="flex-grow-1 ">
						<input
							type="text"
							className="form-control"
							placeholder="variedad"
							name="variedad"
							// value={variedad}
							autoComplete="off"
							// onChange={handleInputChange}
						/>
					</div>
				</div>
			</form>
		</Modal>
	);
};
