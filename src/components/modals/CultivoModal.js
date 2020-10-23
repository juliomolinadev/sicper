import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeCultivosModal, setCultivoSelected } from "../../actions/altaPermisos";
import styled from "styled-components";
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
		height: "500px"
	}
};

const TextField = styled.input`
	height: 32px;
	width: 200px;
	border-radius: 3px;
	border-top-left-radius: 5px;
	border-bottom-left-radius: 5px;
	border-top-right-radius: 0;
	border-bottom-right-radius: 0;
	border: 1px solid #e5e5e5;
	padding: 0 32px 0 16px;

	&:hover {
		cursor: pointer;
	}
`;

Modal.setAppElement("#root");

export const CultivoModal = () => {
	const dispatch = useDispatch();

	const { openCultivosModal, cultivos } = useSelector((state) => state.altaPermisos);
	console.log(cultivos);
	let data = [];
	data = Object.values(cultivos);

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
			<CustomTable
				title={data.length == 0 ? "No se encontraron cultivos" : "Cultivos"}
				columns={cultivosColumns}
				data={data}
				customKey="nombre"
				setFunction={setCultivoSelected}
				closeFunction={closeCultivosModal}
			></CustomTable>
		</Modal>
	);
};
