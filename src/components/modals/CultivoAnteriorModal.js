import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeCultivoAnteriorModal, setCultivoAnteriorSelected } from "../../actions/cultivos";
import { CustomTable } from "../tables/CustomTable";
import { cultivosColumns } from "../tables/configTables";

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

export const CultivoAnteriorModal = () => {
	const dispatch = useDispatch();

	const { openCultivoAnteriorModal, cultivosAnteriores } = useSelector(
		(state) => state.altaPermisos
	);
	let data = [];
	data = Object.values(cultivosAnteriores);

	const closeModal = () => {
		dispatch(closeCultivoAnteriorModal());
	};

	return (
		<Modal
			isOpen={openCultivoAnteriorModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<CustomTable
				title={data.length === 0 ? "No se encontraron cultivos" : "Cultivo Anterior"}
				columns={cultivosColumns}
				data={data}
				setFunction={setCultivoAnteriorSelected}
				closeFunction={closeCultivoAnteriorModal}
			></CustomTable>
		</Modal>
	);
};
