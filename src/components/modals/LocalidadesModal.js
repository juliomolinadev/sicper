import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeLocaltiesModal, setLocaltieSelected } from "../../actions/entidades/localidades";
import { CustomTable } from "../tables/CustomTable";
import { localtiesColumns } from "../tables/configTables";

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

export const LocalidadesModal = () => {
	const dispatch = useDispatch();

	const { openLocaltiesModal, localties } = useSelector((state) => state.entidades);
	let data = [];

	if (localties) {
		data = Object.values(localties);
	}

	const closeModal = () => {
		dispatch(closeLocaltiesModal());
	};

	return (
		<Modal
			isOpen={openLocaltiesModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<CustomTable
				title={data.length === 0 ? "No se encontraron localidades" : "Localidades"}
				columns={localtiesColumns}
				data={data}
				setFunction={setLocaltieSelected}
				closeFunction={closeLocaltiesModal}
			></CustomTable>
		</Modal>
	);
};
