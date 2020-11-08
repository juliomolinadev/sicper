import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeCultivosModal, setCultivoSelected } from "../../actions/cultivos";
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

export const CultivoModal = () => {
	const dispatch = useDispatch();

	const { openCultivosModal, cultivos } = useSelector((state) => state.altaPermisos);
	let data = [];
	data = Object.values(cultivos);

	const closeModal = () => {
		dispatch(closeCultivosModal());
	};

	return (
		<Modal
			isOpen={openCultivosModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<CustomTable
				title={data.length === 0 ? "No se encontraron cultivos" : "Cultivos"}
				columns={cultivosColumns}
				data={data}
				customKeyA="nombre"
				setFunction={setCultivoSelected}
				closeFunction={closeCultivosModal}
			></CustomTable>
		</Modal>
	);
};
