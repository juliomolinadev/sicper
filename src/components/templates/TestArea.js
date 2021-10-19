import React from "react";
import { CustomPermitsReport } from "../ui/organisms/CustomPermitsReport";

export const TestArea = () => {
	return (
		<>
			<div className="row justify-content-center pt-5">
				<h1>TestArea</h1>
			</div>

			<div className="row">
				<CustomPermitsReport />
			</div>
		</>
	);
};
