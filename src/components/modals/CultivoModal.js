import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeCultivosModal } from "../../actions/altaPermisos";

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

export const CultivoModal = () => {
	const dispatch = useDispatch();
	const { openCultivosModal } = useSelector((state) => state.altaPermisos);

	const closeModal = () => {
		dispatch(closeCultivosModal());
	};

	return (
		<Modal
			isOpen={openCultivosModal}
			// onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<h1>Cultivos</h1>
		</Modal>
	);
};
