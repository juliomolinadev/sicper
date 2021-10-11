import React, { useState } from "react";
import { useSelector } from "react-redux";
import { simpleLoadPermits } from "../../../helpers/DB/simpleLoadPermits";
import { useForm } from "../../../hooks/useForm";
import { ReportModule } from "./ReportModule";

export const PermitsReport = () => {
	const { modulo, variablesGlobales } = useSelector((state) => state.auth);
	const { cicloActual } = variablesGlobales;

	const [formValues, handleInputChange] = useForm({ palabra: "" });
	const { palabra } = formValues;
	const [permisos, setPermisos] = useState([]);

	// useEffect(() => {
	// 	console.log("Cambiaron los permisos");
	// 	console.log("permisos en useState: ", permisos);
	// }, [permisos]);

	const filters = ["usuario", "nombreCultivo", "supAutorizada"];

	const getPermisos = async () => {
		const permisosToSet = await simpleLoadPermits(palabra, "numeroPermiso", modulo, cicloActual);
		setPermisos(permisosToSet);
	};

	const setFilter = () => {
		permisos.sort((a, b) => {
			if (a[filters[0]] > b[filters[0]]) {
				return 1;
			}
			if (a[filters[0]] < b[filters[0]]) {
				return -1;
			}
			return 0;
		});

		const newData = permisos.map((element) => element);

		setPermisos(newData);
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			getPermisos();
		}
	};

	const title = "Reporte de permisos";
	const headers = [
		["cuenta", "CUENTA", ""],
		["numeroPermiso", "PERMISO", ""],
		["usuario", "USUARIO", ""],
		["localidad", "LOCALIDAD", ""],
		["lote", "LOTE", "text-center"],
		["nombreCultivo", "CULTIVO", ""],
		["supAutorizada", "SUPERFICIE", "text-center"]
	];

	return (
		<>
			<div className="container d-flex mb-4 col-6">
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
					onClick={getPermisos}
				>
					<i className="fas fa-search"></i>
				</button>
				<button
					className=" btn btn-outline-primary d-sm-block ml-auto"
					type="button"
					onClick={setFilter}
				>
					Filtrar
				</button>
			</div>
			<ReportModule title={title} headers={headers} data={permisos} />;
		</>
	);
};
