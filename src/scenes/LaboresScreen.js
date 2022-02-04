import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { CustomTable } from "../components/tables/CustomTable";
import { laboresColumns } from "../components/tables/configTables";
import {
	setPermisoSelected,
	setTechniciansLabores,
	startLoadPermisosSearch,
	startLoadPermitsForPay
} from "../actions/algodoneroScreen";
import { useForm } from "../hooks/useForm";
import { CheckSanidad } from "../components/modulos/CheckSanidad";
import { PrintSanidadModal } from "../components/modals/PrintSanidadModal";
import { loadTechnician } from "../helpers/DB/loadTechnician";

export const LaboresScreen = () => {
	const dispatch = useDispatch();

	const [formValues, handleInputChange] = useForm({ palabra: "" });
	const { palabra } = formValues;

	const { permisos, permisoSelected, printSanidadModal } = useSelector(
		(state) => state.algodoneroScreen
	);
	// const { uid, rol } = useSelector((state) => state.auth);

	useEffect(() => {
		loadTechnician().then((techniciasns) => {
			dispatch(setTechniciansLabores(techniciasns));
		});
	}, [dispatch]);

	const buscarPermisos = () => {
		if (palabra.length > 0) {
			// dispatch(startLoadPermisosSearch(rol === "tecnicoCESVBC" ? uid : 0, palabra));
			dispatch(startLoadPermisosSearch(0, palabra));
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

	let dataPermiso;

	permisos.forEach((permiso) => {
		if (permiso.id === permisoSelected) {
			dataPermiso = permiso;
		}
	});

	const loadPermitsForPay = () => {
		dispatch(startLoadPermitsForPay());
	};

	return (
		<>
			<div className="row mt-5">
				<div className="col-sm-6 d-inline-flex">
					<input
						type="text"
						className="form-control"
						placeholder="Apellido paterno"
						name="palabra"
						autoComplete="off"
						value={palabra}
						onChange={handleInputChange}
						onKeyUp={handleKeyUp}
					/>

					<button className="btn btn-outline-primary" onClick={buscarPermisos}>
						<i className="fas fa-search"></i>
					</button>
				</div>

				<div className="col-sm-4">
					<button className="btn btn-outline-primary" onClick={loadPermitsForPay}>
						Labores Completas
					</button>
				</div>
			</div>

			<div className="row pt-3 pb-4">
				<div className="col-sm-8 pr-0 mt-3">
					{permisos.length > 0 && (
						<CustomTable
							title="Permisos"
							columns={laboresColumns}
							data={permisos}
							setFunction={setPermisoSelected}
						/>
					)}
				</div>

				{permisoSelected && dataPermiso !== undefined ? <CheckSanidad palabra={palabra} /> : <></>}
			</div>
			{printSanidadModal !== undefined && <PrintSanidadModal />}
		</>
	);
};
