import React from "react";
import { ProducersReport } from "../ui/organisms/ProducersReport";

export const TestArea = () => {
	return (
		<>
			<div className="row justify-content-center pt-5">
				<h1>TestArea</h1>
			</div>

			<div className="row">
				<ProducersReport />
			</div>
		</>
	);
};
