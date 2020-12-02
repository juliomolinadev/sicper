import React from "react";
// import { PermisosTable } from "../tables/PermisosTable";
import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import { CustomTable } from "../tables/CustomTable";
import { permisosColumns } from "../tables/configTables";
import { startLoadPermisos } from "../../actions/permisosScreen";
import { useDispatch, useSelector } from "react-redux";

export const PermisosScreen = () => {
	const dispatch = useDispatch();

	const { permisos } = useSelector((state) => state.permisosScreen);

	if (!permisos) {
		dispatch(startLoadPermisos());
	}

	return (
		<>
			<div className="row m-3">
				<div className="col-sm-8">
					{/* <PermisosTable /> */}
					<CustomTable
						title="Permisos"
						columns={permisosColumns}
						data={permisos}
						// setFunction={startSetUsuarioSelected}
						// closeFunction={closeUsuariosModal}
					></CustomTable>
				</div>

				<div className="col-sm-4 pt-lg-0 pt-4">
					<Link to="/nuevo-permiso">
						<button className="btn btn-outline-primary float-right" type="button">
							<span>Nuevo Permiso </span>
							<i className="fas fa-plus"></i>
						</button>
					</Link>
				</div>
			</div>
		</>
	);
};
