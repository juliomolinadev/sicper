import React from "react";
import { entidades } from "../../helpers/consts";
import { exportJSONToExcel } from "../../helpers/functions/exportJSONToExcel";

export const TestArea = () => {
	const data = [...entidades];
	const handleSaveFile = () => {
		console.log(entidades.length);
		exportJSONToExcel(data, "Entidades", "Julio Molina", "Entidades");
	};
	return (
		<>
			<div className="row justify-content-center pt-5">
				<h1>TestArea</h1>

				<button onClick={handleSaveFile}>Bajar</button>
			</div>
		</>
	);
};
