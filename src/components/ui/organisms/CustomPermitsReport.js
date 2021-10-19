import React, { useState } from "react";
import { useSelector } from "react-redux";
import { simpleLoadPermits } from "../../../helpers/DB/simpleLoadPermits";
import { useForm } from "../../../hooks/useForm";
import { ReportModule } from "./ReportModule";

export const CustomPermitsReport = () => {
	const headers = [
		{ id: "cuenta", header: "CUENTA", styles: "", sum: false, count: false },
		{ id: "numeroPermiso", header: "PERMISO", styles: "", sum: false, count: true },
		{ id: "usuario", header: "USUARIO", styles: "", sum: false, count: false },
		{ id: "nombreProductor", header: "PRODUCTOR", styles: "longCell", sum: false, count: false },
		{ id: "seccion", header: "SECCION", styles: "text-center", sum: false, count: false },
		{ id: "localidad", header: "LOCALIDAD", styles: "", sum: false, count: false },
		{ id: "lote", header: "LOTE", styles: "text-center", sum: false, count: false },
		{ id: "nombreCultivo", header: "CULTIVO", styles: "", sum: false, count: false },
		{ id: "supAutorizada", header: "SUPERFICIE", styles: "text-center", sum: true, count: false }
	];

	const { modulo, variablesGlobales } = useSelector((state) => state.auth);
	const { cicloActual } = variablesGlobales;

	const [formValues, handleInputChange] = useForm({
		palabra: "",
		campo: "",
		filter: "",
		order1: ""
	});
	const { palabra, campo, filter, order1 } = formValues;
	const [permisos, setPermisos] = useState([]);
	console.log(permisos);

	const getTitle = () => {
		const campoForTitle = headers.find((header) => header.id === campo);
		if (campoForTitle) return `REPORTE DE PERMISOS POR ${campoForTitle.header}`;
		else return `REPORTE DE PERMISOS`;
	};

	const title = getTitle();

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

	const getPermisos = async () => {
		if (campo.length) {
			const permisosToSet = await simpleLoadPermits(palabra, campo, modulo, cicloActual);
			setPermisos(permisosToSet);
		}
	};

	const setFilter = () => {
		const cleanPermisos = permisos.filter(
			(permiso) => permiso.cuenta !== "SUBTOTAL" && permiso.cuenta !== "TOTAL"
		);
		const unique = onlyUnique(cleanPermisos, filter);
		const separateData = [];
		const finalData = [];
		const totalRow = { cuenta: "TOTAL" };

		unique.forEach((value) => {
			separateData.push(cleanPermisos.filter((permiso) => permiso[filter] === value));
		});

		separateData.forEach((filterItem) => {
			const subTotalRow = { cuenta: "SUBTOTAL" };

			filterItem.sort((a, b) => {
				if (a[order1] < b[order1]) {
					return 1;
				}
				if (a[order1] > b[order1]) {
					return -1;
				}
				return 0;
			});

			filterItem.forEach((order1Item) => {
				headers.forEach((header) => {
					if (header.sum) {
						if (subTotalRow[header.id]) subTotalRow[header.id] += order1Item[header.id];
						else subTotalRow[header.id] = order1Item[header.id];

						if (totalRow[header.id]) totalRow[header.id] += order1Item[header.id];
						else totalRow[header.id] = order1Item[header.id];
					}

					if (header.count) {
						if (subTotalRow[header.id]) subTotalRow[header.id]++;
						else subTotalRow[header.id] = 1;

						if (totalRow[header.id]) totalRow[header.id]++;
						else totalRow[header.id] = 1;
					}
				});
				finalData.push(order1Item);
			});
			finalData.push(subTotalRow);
		});

		finalData.push(totalRow);
		setPermisos(finalData);
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			getPermisos();
		}
	};

	return (
		<>
			<div className="container mb-4 col-sm-8">
				<div className="row">
					<div className="d-flex col-sm-8">
						<input
							type="text"
							className="form-control"
							placeholder="PARAMETRO DE BUSQUEDA"
							name="palabra"
							autoComplete="off"
							value={palabra}
							onChange={handleInputChange}
							onKeyUp={handleKeyUp}
						/>
					</div>

					<div className="d-flex col-sm-4">
						<select
							name="campo"
							type="text"
							value={campo}
							onChange={handleInputChange}
							className="form-control ml-2"
						>
							<option hidden defaultValue={false}>
								BUSCAR EN
							</option>

							{headers.map((header) => (
								<option key={header.id} value={header.id}>
									{header.header}
								</option>
							))}
						</select>

						<button className="btn btn-outline-primary ml-2" type="button" onClick={getPermisos}>
							<i className="fas fa-search"></i>
						</button>
					</div>
				</div>

				{permisos.length > 0 && (
					<>
						<div className="row mt-2">
							<div className="d-flex col-sm-8">
								<select
									name="filter"
									type="text"
									value={filter}
									onChange={handleInputChange}
									className="form-control ml-2"
								>
									<option hidden defaultValue={false}>
										ORDENAR POR
									</option>

									{headers.map((header) => (
										<option key={header.id} value={header.id}>
											{header.header}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="row mt-2">
							<div className="d-flex col-sm-8">
								<select
									name="order1"
									type="text"
									value={order1}
									onChange={handleInputChange}
									className="form-control ml-2"
								>
									<option hidden defaultValue={false}>
										ORDENAR POR
									</option>

									{headers.map((header) => (
										<option key={header.id} value={header.id}>
											{header.header}
										</option>
									))}
								</select>
							</div>

							<div className="d-flex col-sm-4">
								<button
									className=" btn btn-outline-primary d-sm-block ml-2 "
									type="button"
									onClick={() => setFilter()}
								>
									Filtrar
								</button>
							</div>
						</div>
					</>
				)}
			</div>

			{permisos.length > 0 && (
				<ReportModule
					title={title}
					headers={headers}
					data={permisos}
					rowsPerPage={24}
					orientation="landscape"
				/>
			)}
		</>
	);
};
