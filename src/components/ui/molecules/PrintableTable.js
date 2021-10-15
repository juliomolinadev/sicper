import React, { forwardRef } from "react";
import { ReportHeader } from "./ReportHeader";

export const PrintableTable = forwardRef((props, ref) => {
	const { title, headers, data, rowsPerPage, orientation = "portrait" } = props;

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
					<ReportHeader title={title} pages={separateData.length} page={i + 1} />

					<table className="table table-sm table-striped border mt-4" style={{ fontSize: 12 }}>
						<thead className="thead-light">
							<tr>
								{headers.map((element) => (
									<th key={`${i}-${element.id}`} scope="col" className={element.styles}>
										{element.header}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{dataPart &&
								dataPart.map((row, j) => (
									<tr key={`${i}-${j}-${row[0]}`}>
										{headers.map((element, k) => (
											<td key={`${i}-${k}-${element.id}`} className={element.styles}>
												{row[element.id]}
											</td>
										))}
									</tr>
								))}
						</tbody>
					</table>
				</div>
			))}
		</div>
	);
});
