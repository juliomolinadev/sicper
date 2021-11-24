import React, { useState } from "react";

import { usersHeaders } from "../../../helpers/constants/reportsColumns";
import { useFilteredData } from "../../../hooks/useFilteredData";
import { useForm } from "../../../hooks/useForm";
import { ReportModule } from "./ReportModule";
import { simpleLoadUsers } from "../../../helpers/DB/simpleLoadUsers";
import { useSelector } from "react-redux";

export const UsersReport = () => {
	const { modulo } = useSelector((state) => state.auth);

	const [formValues, handleInputChange] = useForm({ palabra: "", campo: "" });
	const { palabra, campo } = formValues;

	const [headers, setHeaders] = useState(usersHeaders);
	const handleColumn = ({ target }) => {
		const index = headers.findIndex((header) => header.id === target.id);

		const newHeaders = headers.map((header) => header);
		newHeaders.splice(index, 1, {
			...headers[index],
			display: !headers[index].display
		});
		setHeaders(newHeaders);
	};

	const [
		data,
		setData,
		filters,
		handleFiltersChange,
		extraRows,
		handleExtraRowsChange,
		resetFilters
	] = useFilteredData(headers, []);
	const { filter, order1 } = filters;
	const { includeEmtyRow, includeSubtotalRow } = extraRows;

	const getUsers = async () => {
		if (campo.length) {
			const usersToSet = await simpleLoadUsers(palabra, campo, modulo);
			resetFilters();
			setData(usersToSet);
		}
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			getUsers();
		}
	};

	const getTitle = (titleFor, reportOf) => {
		const campoForTitle =
			filter.length > 0
				? headers.find((header) => header.id === filter)
				: headers.find((header) => header.id === campo);

		if (!campoForTitle) return `USUARIOS`;
		if (titleFor === "report") return `REPORTE DE ${reportOf} POR ${campoForTitle.header}`;
		if (titleFor === "excel") return `${reportOf} POR ${campoForTitle.header}`;
	};

	const title = getTitle("report", "USUARIOS");
	const excelTitle = getTitle("excel", "USUARIOS");

	return (
		<>
			<div className="container mb-4 col-sm-8">
				<div className="row">
					<div className="col-sm-8">
						<label htmlFor="palabra">PARAMETRO DE BUSQUEDA:</label>
						<input
							type="text"
							className="form-control"
							name="palabra"
							id="palabra"
							autoComplete="off"
							value={palabra}
							onChange={handleInputChange}
							onKeyUp={handleKeyUp}
						/>
					</div>

					<div className="col-sm-4">
						<label htmlFor="campo">BUSCAR EN:</label>
						<div className="d-flex">
							<select
								name="campo"
								id="campo"
								type="text"
								value={campo}
								onChange={handleInputChange}
								className="form-control"
							>
								<option hidden defaultValue={false}>
									-
								</option>

								{headers.map((header) => {
									if (header.search) {
										return (
											<option key={header.id} value={header.id}>
												{header.header}
											</option>
										);
									} else return <option key={header.id} style={{ display: "none" }}></option>;
								})}
							</select>

							<button className="btn btn-outline-primary ml-2" type="button" onClick={getUsers}>
								<i className="fas fa-search"></i>
							</button>
						</div>
					</div>
				</div>

				{data.length > 0 && (
					<>
						<div className="row mt-4">
							<div className="col-sm-8">
								<label htmlFor="filter">ORDENADO Y SUBTOTALES POR:</label>

								<select
									name="filter"
									id="filter"
									type="text"
									value={filter}
									onChange={handleFiltersChange}
									className="form-control"
								>
									<option hidden defaultValue={false}>
										-
									</option>

									{headers.map((header) => (
										<option key={header.id} value={header.id}>
											{header.header}
										</option>
									))}
								</select>
							</div>

							<div className="col-sm-4 align-self-end">
								<div className="form-group form-check">
									<input
										type="checkbox"
										name="includeSubtotalRow"
										id="includeSubtotalRow"
										value={includeSubtotalRow}
										checked={includeSubtotalRow}
										onChange={handleExtraRowsChange}
										className="form-check-input"
									></input>
									<label htmlFor="includeSubtotalRow"> INCLUIR SUBTOTALES </label>
								</div>
							</div>
						</div>

						<div className="row mt-2">
							<div className="col-sm-8">
								<label htmlFor="order1">SUB-ORDENADO POR:</label>

								<select
									name="order1"
									id="order1"
									type="text"
									value={order1}
									onChange={handleFiltersChange}
									className="form-control"
								>
									<option hidden defaultValue={false}>
										-
									</option>

									{headers.map((header) => (
										<option key={header.id} value={header.id}>
											{header.header}
										</option>
									))}
								</select>
							</div>

							<div className="col-sm-4 align-self-end">
								<div className="form-group form-check">
									<input
										type="checkbox"
										name="includeEmtyRow"
										id="includeEmtyRow"
										value={includeEmtyRow}
										checked={includeEmtyRow}
										onChange={handleExtraRowsChange}
										className="form-check-input"
									></input>
									<label htmlFor="includeEmtyRow"> INCLUIR SEPARACIÓN </label>
								</div>
							</div>
						</div>

						<div className="row mt-4">
							<div className="col-sm-12">
								{headers.map((header) => {
									if (header.selectable) {
										const style = header.display
											? "btn btn-sm btn-info m-1"
											: "btn btn-sm btn-outline-info m-1";
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
				<ReportModule title={title} excelTitle={excelTitle} headers={headers} data={data} />
			)}
		</>
	);
};
