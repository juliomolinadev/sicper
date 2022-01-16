import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeUserRoleModal } from "../../actions/ui";
import { AddNewUserRoleForm } from "../forms/AddNewUserRoleForm";
import { SelectRoleToEditForm } from "../forms/SelectRoleToEditForm";
import { UserPrivilegesForm } from "../forms/UserPrivilegesForm";

const customStyles = {
	content: {
		width: "1125px",
		height: "1500px",
		overflow: "auto"
	}
};

Modal.setAppElement("#root");

export const UserRoleModal = () => {
	const dispatch = useDispatch();

	const { isOpenUserRoleModal } = useSelector((state) => state.ui);
	const { privilegesToEdit, userRoleSelected } = useSelector((state) => state.entidades);

	const closeModal = () => {
		dispatch(closeUserRoleModal());
	};

	return (
		<Modal
			isOpen={isOpenUserRoleModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="printModal"
			overlayClassName="modal-fondo"
		>
			<div className="p-4">
				<AddNewUserRoleForm />
			</div>
			<div className="p-4">
				<SelectRoleToEditForm />
			</div>
			<div className="p-4">
				{privilegesToEdit && userRoleSelected ? <UserPrivilegesForm /> : <></>}
			</div>
		</Modal>
	);
};
