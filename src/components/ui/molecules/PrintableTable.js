import React, { forwardRef } from "react";
import { ReportHeader } from "./ReportHeader";

export const PrintableTable = forwardRef((props, ref) => {
	const {
		title,
		headers,
		data,
		rowsPerPage,
		orientation = "portrait",
		fechaInicial,
		fechaFinal
	} = props;

	const getPageMargins = () => {
		const marginTop = 60;
		const marginRight = 60;
		const marginBottom = 60;
		const marginLeft = 60;
		return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; size:letter ${orientation};}`;
	};

	const separateData = [];

	for (let i = 0; i < data.length; i += rowsPerPage) {
		let fracment = data.slice(i, i + rowsPerPage);
		separateData.push(fracment);
	}

	return (
		<div ref={ref}>
			{separateData.map((dataPart, i) => (
				<div key={i} className="page-break">
					<style>{getPageMargins()}</style>
					<ReportHeader
						title={title}
						pages={separateData.length}
						page={i + 1}
						fechaInicial={fechaInicial}
						fechaFinal={fechaFinal}
					/>

					<table className="table table-sm table-striped border mt-4" style={{ fontSize: 12 }}>
						<thead className="thead-light">
							<tr>
								{headers.map((element) => {
									if (element.display) {
										return (
											<th key={`${i}-${element.id}`} scope="col" className={element.styles}>
												{element.header}
											</th>
										);
									} else return <th key={`${i}-${element.id}`} style={{ display: "none" }}></th>;
								})}
							</tr>
						</thead>
						<tbody>
							{dataPart &&
								dataPart.map((row, j) => (
									<tr key={`${i}-${j}-${row[0]}`}>
										{headers.map((element, k) => {
											if (element.display) {
												if (typeof row[element.id] === "object") {
													const fechaObject = row[element.id].toDate();
													const fecha = fechaObject.toLocaleDateString();
													return (
														<td key={`${i}-${k}-${fecha}`} className={element.styles}>
															{fecha}
														</td>
													);
												} else {
													return (
														<td key={`${i}-${k}-${element.id}`} className={element.styles}>
															{element.float
																? row[element.id].toFixed(element.float)
																: row[element.id]}
														</td>
													);
												}
											} else
												return (
													<td key={`${i}-${k}-${element.id}`} style={{ display: "none" }}></td>
												);
										})}
									</tr>
								))}
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
});
