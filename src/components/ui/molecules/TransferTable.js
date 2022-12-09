import React, { forwardRef } from "react";
import { roundToN } from "../../../helpers/functions/roundToN";
import { ReportHeader } from "./ReportHeader";

export const TransferTable = forwardRef((props, ref) => {
	const { data, title, orientation } = props;

	const getPageMargins = () => {
		const marginTop = 60;
		const marginRight = 60;
		const marginBottom = 60;
		const marginLeft = 60;
		return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; size:letter ${orientation};}`;
	};

	return (
		<div ref={ref} className="mt-3">
			<style>{getPageMargins()}</style>
			<ReportHeader title={title} pages={1} page={1} />
			<table className="table table-sm mt-3">
				<tbody>
					{data.map((row, i) => (
						<tr key={`row-${i}`}>
							{row.map((cell, j) => (
								<th
									key={`cell-${i}${j}`}
									className={`text-center border border-dark ${i === j && "bg-secondary"}`}
									style={{ fontSize: 12 }}
								>
									{i === j && i !== 0 && j !== 0 && i !== 24 && j !== 24
										? "X"
										: typeof cell === "number"
										? roundToN(cell, 4)
										: cell}
								</th>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
});
