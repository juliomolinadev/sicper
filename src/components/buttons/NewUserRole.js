import React from "react";
import { useDispatch } from "react-redux";
import { openUserRoleModal } from "../../actions/ui";

export const NewUserRole = () => {
	const dispatch = useDispatch();

	const handOpenUserRoleModal = () => {
		dispatch(openUserRoleModal());
	};

	return (
		<div className="d-flex justify-content-center">
			<button className="btn btn-outline-primary" type="button" onClick={handOpenUserRoleModal}>
				<span>Gestionar Roles </span>
				<i className="fa fa-edit"></i>
			</button>
		</div>
	);
};
