import React, { forwardRef } from "react";
import Header from "../Header";

export const PrintableTable = forwardRef((props, ref) => {
	const { title } = props;
	return (
		<div ref={ref}>
			<Header />
			<h1>{title}</h1>
		</div>
	);
});
