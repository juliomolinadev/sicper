import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setPermisoSelected, startLoadPermisosSearch } from "../../actions/algodoneroScreen";
import { useForm } from "../../hooks/useForm";
import { types } from "../../types/types";
import { laboresColumns } from "./configTables";
import { CustomTable } from "./CustomTable";

export const LaboresPermitsTable = ({ dispatch: dispatchLocal }) => {
	const dispatch = useDispatch();

	const [formValues, handleInputChange] = useForm({ palabra: "" });
	const { palabra } = formValues;

	const { permisos } = useSelector((state) => state.algodoneroScreen);
	const { uid, rol, variablesGlobales } = useSelector((state) => state.auth);

	const buscarPermisos = () => {
		if (palabra.length > 0) {
			dispatch(
				startLoadPermisosSearch(
					rol === "tecnicoCESVBC" ? uid : 0,
					palabra,
					variablesGlobales.cicloActual
				)
			);
			dispatchLocal({ type: types.setBusqueda, payload: palabra });
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

	return (
		<>
			<div className="d-inline-flex">
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

				<button
					className=" btn btn-outline-primary d-sm-block ml-auto"
					type="button"
					onClick={buscarPermisos}
				>
					<i className="fas fa-search"></i>
				</button>
			</div>

			<div className="">
				{permisos.length > 0 && (
					<CustomTable
						title="Permisos"
						columns={laboresColumns}
						data={permisos}
						setFunction={setPermisoSelected}
					/>
				)}
			</div>
		</>
	);
};
