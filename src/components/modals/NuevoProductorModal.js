import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeNuevoProductorModal } from "../../actions/nuevoProductor";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		height: "550px"
	}
};

Modal.setAppElement("#root");

export const NuevoProductorModal = () => {
	const dispatch = useDispatch();

	const { openNuevoProductorModal } = useSelector((state) => state.altaPermisos);

	const closeModal = () => {
		dispatch(closeNuevoProductorModal());
	};

	return (
		<Modal
			isOpen={openNuevoProductorModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<h1>Nuevo productor</h1>
		</Modal>
	);
};
