import React from "react";
import { ExpeditionCheckModule } from "../modulos/ExpeditionCheckModule";
import { ProducersReport } from "../ui/organisms/ProducersReport";

export const TestArea = () => {
	// console.log("modulo en test: ", modulo);
	return (
		<>
			<div className="row justify-content-center pt-5">
				<h1>TestArea</h1>
			</div>

			<div className="row">
				<ProducersReport />
			</div>

			<div className="row justify-content-center pt-5">
				<h1>Dev Tools</h1>
			</div>

			<div className="row border rounded p-3 m-1">
				<ExpeditionCheckModule />
			</div>
		</>
	);
};
