import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeUserRoleModal } from "../../actions/ui";
import { AddNewUserRoleForm } from "../forms/AddNewUserRoleForm";
import { SelectRoleToEditForm } from "../forms/SelectRoleToEditForm";
import { UserPrivilegesForm } from "../forms/UserPrivilegesForm";

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

export const UserRoleModal = () => {
	const dispatch = useDispatch();

	const { isOpenUserRoleModal } = useSelector((state) => state.ui);
	const { privilegesToEdit } = useSelector((state) => state.entidades);

	const closeModal = () => {
		dispatch(closeUserRoleModal());
	};

	return (
		<Modal
			isOpen={isOpenUserRoleModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<AddNewUserRoleForm />
			<div className="row d-flex justify-content-center">
				<div className="col-sm-4">
					<SelectRoleToEditForm />
				</div>
			</div>
			{privilegesToEdit ? <UserPrivilegesForm /> : <></>}
		</Modal>
	);
};
