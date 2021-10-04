import React, { forwardRef } from "react";
import { ReportHeader } from "./ReportHeader";

export const PrintableTable = forwardRef((props, ref) => {
	const { title } = props;
	return (
		<div ref={ref}>
			<ReportHeader />
			<h1>{title}</h1>
		</div>
	);
});
