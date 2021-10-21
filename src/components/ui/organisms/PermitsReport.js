import React, { useState } from "react";
import { useSelector } from "react-redux";
import { permitsHeaders } from "../../../helpers/constants/reportsColumns";
import { simpleLoadPermits } from "../../../helpers/DB/simpleLoadPermits";
import { useForm } from "../../../hooks/useForm";
import { ReportModule } from "./ReportModule";

export const PermitsReport = () => {
	const title = "Reporte de permisos";

	const { modulo, variablesGlobales } = useSelector((state) => state.auth);
	const { cicloActual } = variablesGlobales;

	const [formValues, handleInputChange] = useForm({ palabra: "" });
	const { palabra } = formValues;
	const [permisos, setPermisos] = useState([]);

	const onlyUnique = (objectsArray, key) => {
		const unique = [];
		objectsArray.forEach((element) => {
			const index = unique.indexOf(element[key]);
			if (index === -1) {
				unique.push(element[key]);
			}
		});

		unique.sort((a, b) => {
			if (a > b) return 1;
			if (a < b) return -1;
			return 0;
		});

		return unique;
	};

	const filter = "seccion";
	const order1 = "localidad";

	const getPermisos = async () => {
		const permisosToSet = await simpleLoadPermits(palabra, "seccion", modulo, cicloActual);
		setPermisos(setFilter(permisosToSet));
	};

	const setFilter = (permisos) => {
		const unique = onlyUnique(permisos, filter);
		const separateData = [];
		const finalData = [];

		unique.forEach((value) => {
			separateData.push(permisos.filter((permiso) => permiso[filter] === value));
		});

		separateData.forEach((filterItem) => {
			filterItem.sort((a, b) => {
				if (a[order1] > b[order1]) {
					return 1;
				}
				if (a[order1] < b[order1]) {
					return -1;
				}
				return 0;
			});

			filterItem.forEach((order1Item) => {
				finalData.push(order1Item);
			});
		});

		return finalData;
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			getPermisos();
		}
	};

	return (
		<>
			<div className="container d-flex mb-4 col-6">
				<input
					type="text"
					className="form-control"
					placeholder="Seccion"
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
			</div>

			{permisos.length > 0 && (
				<ReportModule
					title={title}
					excelTitle={"REPORTE DE PERMISOS POR SECCION"}
					headers={permitsHeaders}
					data={permisos}
					rowsPerPage={24}
					orientation="landscape"
				/>
			)}
		</>
	);
};
