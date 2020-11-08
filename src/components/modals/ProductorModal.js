import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeProductoresModal, setProductorSelected } from "../../actions/productores";
import { openNuevoProductorModal } from "../../actions/nuevoProductor";
import { CustomTable } from "../tables/CustomTable";
import { productoresColumns } from "../tables/configTables";

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

export const ProductorModal = () => {
	const dispatch = useDispatch();

	const { openProductoresModal, productores } = useSelector((state) => state.altaPermisos);
	let data = [];
	data = Object.values(productores);

	const closeModal = () => {
		dispatch(closeProductoresModal());
	};

	const changeProductorModal = () => {
		dispatch(closeProductoresModal());
		dispatch(openNuevoProductorModal());
	};

	return (
		<Modal
			isOpen={openProductoresModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<CustomTable
				title={data.length === 0 ? "No se encontraron productores" : "Productores"}
				columns={productoresColumns}
				data={data}
				customKeyA="rfc"
				setFunction={setProductorSelected}
				closeFunction={closeProductoresModal}
			></CustomTable>

			<div className="row d-flex justify-content-center pt-3">
				<button className="btn btn-outline-primary" type="button" onClick={changeProductorModal}>
					<span>Registrar nuevo productor </span>
					<i className="fas fa-plus"></i>
				</button>
			</div>
		</Modal>
	);
};
