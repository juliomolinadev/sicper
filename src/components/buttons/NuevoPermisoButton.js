import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { startSetVariablesGlobales } from "../../actions/auth";

export const NuevoPermisoButton = () => {
	const dispatch = useDispatch();

	const handleSetVariablesGlobales = () => {
		dispatch(startSetVariablesGlobales());
	};

	return (
		<div className="d-flex justify-content-center">
			<Link to="/nuevo-permiso">
				<button
					className="btn btn-outline-primary"
					type="button"
					onClick={handleSetVariablesGlobales}
				>
					<span>Nuevo Permiso </span>
					<i className="fas fa-plus"></i>
				</button>
			</Link>
		</div>
	);
};
