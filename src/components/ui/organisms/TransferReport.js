import React, { useState } from "react";

import {
	transferEntrantesHeaders,
	transferSalientesHeaders
} from "../../../helpers/constants/reportsColumns";
import { useFilteredData } from "../../../hooks/useFilteredData";
import { ReportModule } from "./ReportModule";
import { useSelector } from "react-redux";
import { simpleLoadTransfer } from "../../../helpers/DB/simpleLoadTransfer";
import { useMultiInput } from "../../../hooks/useMultiInput";

export const TransferReport = ({ tipo }) => {
	const { modulo, variablesGlobales } = useSelector((state) => state.auth);
	const { cicloActual: ciclo } = variablesGlobales;

	const [formValues, handleInputChange, addPair, removePair] = useMultiInput([
		{ palabra: "", campo: "" }
	]);

	const [headers, setHeaders] = useState(
		tipo === "salientes" ? transferSalientesHeaders : transferEntrantesHeaders
	);
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

	const getTransfer = async () => {
		if (formValues[0].campo.length) {
			const transfersToSet = await simpleLoadTransfer(formValues, modulo, ciclo, tipo);
			resetFilters();
			setData(transfersToSet);
		}
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			getTransfer();
		}
	};

	const getTitle = (titleFor, reportOf) => {
		const campoForTitle =
			filter.length > 0
				? headers.find((header) => header.id === filter)
				: headers.find((header) => header.id === formValues[0].campo);

		if (!campoForTitle) return `TRANSFERENCIAS`;
		if (titleFor === "report") return `REPORTE DE ${reportOf} POR ${campoForTitle.header}`;
		if (titleFor === "excel") return `${reportOf} POR ${campoForTitle.header}`;
	};

	const title = getTitle("report", "TRANSFERENCIAS");
	const excelTitle = getTitle("excel", "TRANSFERENCIAS");

	return (
		<>
			<div className="container mb-4 col-sm-8">
				<div className="row d-flex justify-content-end">
					{formValues.length > 1 && (
						<button className="btn btn-outline-primary ml-2" type="button" onClick={removePair}>
							<i className="fas fa-minus"></i>
						</button>
					)}

					<button className="btn btn-outline-primary ml-2" type="button" onClick={addPair}>
						<i className="fas fa-plus"></i>
					</button>

					<button className="btn btn-outline-primary ml-2" type="button" onClick={getTransfer}>
						<i className="fas fa-search"></i>
					</button>
				</div>

				{formValues.map((pair, i) => (
					<div className="row mt-2" key={`form${i}`}>
						<div className="col-sm-8">
							<label htmlFor="palabra">PARAMETRO DE BUSQUEDA:</label>
							<input
								index={i}
								type="text"
								className="form-control"
								name="palabra"
								id="palabra"
								autoComplete="off"
								value={pair.palabra}
								onChange={handleInputChange}
								onKeyUp={handleKeyUp}
							/>
						</div>

						<div className="col-sm-4">
							<label htmlFor="campo">BUSCAR EN:</label>
							<div className="d-flex">
								<select
									index={i}
									name="campo"
									id="campo"
									type="text"
									value={pair.campo}
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
							</div>
						</div>
					</div>
				))}

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
