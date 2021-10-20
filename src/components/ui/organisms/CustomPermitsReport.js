import React, { useState } from "react";
import { useSelector } from "react-redux";
import { permitsHeaders } from "../../../helpers/constants/reportsColumns";
import { simpleLoadPermits } from "../../../helpers/DB/simpleLoadPermits";
import { useFilteredData } from "../../../hooks/useFilteredData";
import { useForm } from "../../../hooks/useForm";
import { ReportModule } from "./ReportModule";

export const CustomPermitsReport = () => {
	const { modulo, variablesGlobales } = useSelector((state) => state.auth);
	const { cicloActual } = variablesGlobales;

	const [formValues, handleInputChange] = useForm({ palabra: "", campo: "" });
	const { palabra, campo } = formValues;

	const [headers, setHeaders] = useState(permitsHeaders);
	const handleColumn = ({ target }) => {
		const index = headers.findIndex((header) => header.id === target.id);

		const newHeaders = headers.map((header) => header);
		newHeaders.splice(index, 1, {
			...headers[index],
			display: !headers[index].display
		});
		setHeaders(newHeaders);
	};

	const getTitle = () => {
		const campoForTitle = headers.find((header) => header.id === campo);
		if (campoForTitle) return `REPORTE DE PERMISOS POR ${campoForTitle.header}`;
		else return `REPORTE DE PERMISOS`;
	};
	const title = getTitle();

	const [data, setData, filters, handleFiltersChange] = useFilteredData(headers, []);
	const { filter, order1 } = filters;
	const getPermisos = async () => {
		if (campo.length) {
			const permisosToSet = await simpleLoadPermits(palabra, campo, modulo, cicloActual);
			setData(permisosToSet);
		}
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
								BUSCAR EN:
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

				{data.length > 0 && (
					<>
						<div className="row mt-2">
							<div className="d-flex col-sm-8">
								<select
									name="filter"
									type="text"
									value={filter}
									onChange={handleFiltersChange}
									className="form-control ml-2"
								>
									<option hidden defaultValue={false}>
										SUBTOTALES POR:
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
									onChange={handleFiltersChange}
									className="form-control ml-2"
								>
									<option hidden defaultValue={false}>
										ORDENAR POR:
									</option>

									{headers.map((header) => (
										<option key={header.id} value={header.id}>
											{header.header}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="row mt-4">
							<div className="col-sm-12">
								{headers.map((header) => {
									if (header.selectable) {
										const style = header.display
											? "btn btn-sm btn-primary m-1"
											: "btn btn-sm btn-outline-primary m-1";
										return (
											<button
												key={`0-${header.header}`}
												className={style}
												onClick={handleColumn}
												id={header.id}
												value={header.selectable}
											>
												{header.header}
											</button>
										);
									} else return <div key={`1-${header.header}`} style={{ display: "none" }}></div>;
								})}
							</div>
						</div>
					</>
				)}
			</div>

			{data.length > 0 && (
				<ReportModule
					title={title}
					headers={headers}
					data={data}
					rowsPerPage={24}
					orientation="landscape"
				/>
			)}
		</>
	);
};
