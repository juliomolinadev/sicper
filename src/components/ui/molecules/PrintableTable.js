import React, { forwardRef } from "react";
import { ReportHeader } from "./ReportHeader";

export const PrintableTable = forwardRef((props, ref) => {
	const { title, headers, data } = props;

	const getPageMargins = () => {
		const marginTop = 60;
		const marginRight = 60;
		const marginBottom = 60;
		const marginLeft = 60;
		return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }`;
	};

	return (
		<div ref={ref} className="">
			<style>{getPageMargins()}</style>
			<ReportHeader title={title} />

			<table className="table table-sm table-striped border mt-4" style={{ fontSize: 12 }}>
				<thead className="thead-light">
					<tr>
						{headers.map((element) => (
							<th key={element[0]} scope="col" className={element[2]}>
								{element[1]}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data &&
						data.map((row, i) => (
							<tr key={`${i}-${row[0]}`}>
								{headers.map((element, j) => (
									<td key={`${j}-${element[0]}`} className={element[2]}>
										{row[element[0]]}
									</td>
								))}
							</tr>
						))}
				</tbody>
			</table>
		</div>
	);
});
