import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import Swal from "sweetalert2";
import { CustomTable } from "../tables/CustomTable";
import { permisosColumns } from "../tables/configTables";
import {
	startLoadPermisos,
	setPermisoSelected,
	startLoadPermisosSearch
} from "../../actions/algodoneroScreen";
import { useForm } from "../../hooks/useForm";
import { CheckSanidad } from "../Modulos/CheckSanidad";

export const AlgodoneroScreen = () => {
	const dispatch = useDispatch();

	const [formValues, handleInputChange] = useForm({ palabra: "" });

	const { palabra } = formValues;

	const { permisos, permisoSelected } = useSelector((state) => state.algodoneroScreen);

	if (permisos.length === 0) {
		dispatch(startLoadPermisos());
	}

	const buscarPermisos = () => {
		if (palabra.length > 0) {
			dispatch(startLoadPermisosSearch(palabra));
		} else {
			Swal.fire(
				"Nada para buscar",
				"Ingrese número de permiso, número de cuenta o el apellido paterno del usuario.",
				"warning"
			);
		}
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			buscarPermisos();
		}
	};

	let permisosFormateados = [];

	permisos.forEach((permiso) => {
		permisosFormateados.push({
			...permiso,
			fechaEmicion: moment(permiso.fechaEmicion.toDate()).format("DD/MM/YYYY"),
			fechaLimite: moment(permiso.fechaLimite.toDate()).format("DD/MM/YYYY"),
			vigencia: moment(permiso.vigencia.toDate()).format("DD/MM/YYYY")
		});
	});

	let dataPermiso;

	permisos.forEach((permiso) => {
		if (permiso.id === permisoSelected) {
			dataPermiso = permiso;
		}
	});

	return (
		<>
			<div className="row mt-5">
				<div className="col-sm-4 d-inline-flex p-3 ">
					<input
						type="text"
						className="form-control"
						placeholder="Número de permiso, número de cuenta o apellido paterno"
						name="palabra"
						autoComplete="off"
						value={palabra}
						onChange={handleInputChange}
						onKeyUp={handleKeyUp}
					/>

					<button
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={buscarPermisos}
					>
						<i className="fas fa-search"></i>
					</button>
				</div>
			</div>

			<div className="row pt-3 pb-4">
				<div className="col-sm-8 pr-0 mt-3">
					<CustomTable
						title="Permisos"
						columns={permisosColumns}
						data={permisosFormateados}
						setFunction={setPermisoSelected}
					></CustomTable>
				</div>

				{permisoSelected && dataPermiso !== undefined ? <CheckSanidad /> : <></>}
			</div>
		</>
	);
};
