import React from "react";
import { Link } from "react-router-dom";

export const NuevoPermisoButton = () => {
	return (
		<div className="d-flex justify-content-center">
			<Link to="/nuevo-permiso">
				<button className="btn btn-outline-primary" type="button">
					<span>Nuevo Permiso </span>
					<i className="fas fa-plus"></i>
				</button>
			</Link>
		</div>
	);
};
