import React from "react";
// import { PermisosTable } from "../tables/PermisosTable";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "../tables/CustomTable";
import { permisosColumns } from "../tables/configTables";
import { loadUltimosPermisos } from "../../helpers/loadUltimosPermisos";

export const PermisosScreen = () => {
	const permisos = loadUltimosPermisos();
	console.log("Permisos: ", permisos);

	let data = [];

	return (
		<>
			<div className="row m-3">
				<div className="col-sm-8">
					{/* <PermisosTable /> */}
					<CustomTable
						title="Permisos"
						columns={permisosColumns}
						data={data}
						// setFunction={startSetUsuarioSelected}
						// closeFunction={closeUsuariosModal}
					></CustomTable>
				</div>

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
