import React from "react";
// import { PermisosTable } from "../tables/PermisosTable";
import { Link } from "react-router-dom";

export const PermisosScreen = () => {
	return (
		<>
			<div className="row m-3 d-flex justify-content-center">
				<h1>Permisos</h1>
			</div>
			<div className="row m-3">
				<div className="col-sm-8 border rounded">{/* <PermisosTable /> */}</div>
				<div className="col-sm-4 pt-lg-0 pt-4">
					<Link to="/nuevo-permiso">
						<button className="btn btn-primary float-right" type="button">
							<span>Nuevo Permiso </span>
							<i className="fas fa-plus"></i>
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};
