import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeUsuariosModal, setUsuarioSelected } from "../../actions/usuarios";
import { CustomTable } from "../tables/CustomTable";
import { derechosColumns } from "../tables/configTables";

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

export const UsuarioModal = () => {
	const dispatch = useDispatch();

	const { openUsuariosModal, usuarios } = useSelector((state) => state.altaPermisos);
	let data = [];
	data = Object.values(usuarios);

	const closeModal = () => {
		dispatch(closeUsuariosModal());
	};

	return (
		<Modal
			isOpen={openUsuariosModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<CustomTable
				title={data.length === 0 ? "No se encontraron usuarios" : "Usuarios"}
				columns={derechosColumns}
				data={data}
				customKeyA="cuenta"
				customKeyB="subcta"
				setFunction={setUsuarioSelected}
				closeFunction={closeUsuariosModal}
			></CustomTable>
		</Modal>
	);
};
