import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeUsuariosModal, startSetUsuarioSelected } from "../../actions/usuarios";
import { CustomTable } from "../tables/CustomTable";
import { usuariosColumns } from "../tables/configTables";

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
			{/* TODO: Poner el nobre de la localidad en lugar de la clave */}
			<CustomTable
				title={data.length === 0 ? "No se encontraron usuarios" : "Usuarios"}
				columns={usuariosColumns}
				data={data}
				setFunction={startSetUsuarioSelected}
				closeFunction={closeUsuariosModal}
			></CustomTable>
		</Modal>
	);
};
