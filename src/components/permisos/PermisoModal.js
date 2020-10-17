import React, { useState } from "react";
import Modal from "react-modal";
import { PadronModal } from "../modals/PadronModal";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)"
	}
};

Modal.setAppElement("#root");

export const PermisoModal = () => {
	// const [isOpen, setIsOpen] = useState(true);

	// const closeModal = () => {
	// 	setIsOpen(false);
	// };

	const [state, setState] = useState({
		permisoModal: true
	});

	const { permisoModal } = state;

	const closeModal = () => {
		setState({ ...state, permisoModal: false });
	};

	return (
		<Modal
			isOpen={permisoModal}
			// onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<PadronModal />
		</Modal>
	);
};
