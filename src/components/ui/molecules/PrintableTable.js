import React, { forwardRef } from "react";
import { ReportHeader } from "./ReportHeader";

export const PrintableTable = forwardRef((props, ref) => {
	const { title, headers, data, rowsPerPage, orientation = "portrait", range } = props;

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
					<ReportHeader title={title} pages={separateData.length} page={i + 1} range={range} />

					<table className="table table-sm table-striped border mt-4" style={{ fontSize: 12 }}>
						<thead className="thead-light">
							<tr>
								{headers.map((header) => {
									if (header.display) {
										return (
											<th key={`${i}-${header.id}`} scope="col" className={header.styles}>
												{header.header}
											</th>
										);
									} else return <th key={`${i}-${header.id}`} style={{ display: "none" }}></th>;
								})}
							</tr>
						</thead>
						<tbody>
							{dataPart &&
								dataPart.map((row, j) => (
									<tr key={`${i}-${j}-${row[0]}`}>
										{headers.map((header, k) => {
											if (header.display) {
												if (typeof row[header.id] === "object") {
													const fechaObject = row[header.id].toDate();
													const fecha = fechaObject.toLocaleDateString();
													return (
														<td key={`${i}-${k}-${fecha}`} className={header.styles}>
															{fecha}
														</td>
													);
												} else {
													return (
														<td key={`${i}-${k}-${header.id}`} className={header.styles}>
															{header.float
																? isNaN(
																		Intl.NumberFormat("en-IN", {
																			minimumFractionDigits: header.float
																		}).format(row[header.id])
																  )
																	? "-"
																	: Intl.NumberFormat("en-IN", {
																			minimumFractionDigits: header.float
																	  }).format(row[header.id])
																: row[header.id]}
														</td>
													);
												}
											} else
												return <td key={`${i}-${k}-${header.id}`} style={{ display: "none" }}></td>;
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
