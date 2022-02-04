import React from "react";
import { printDuplicatePermits } from "../../helpers/printDuplicatePermits";
// import { editarPermisos } from "../../helpers/DB/editarPermisos";
import { ExpeditionCheckModule } from "../modulos/ExpeditionCheckModule";
import { PermisosExcelModule } from "../modulos/PermisosExcelModule";
import { ProducersReport } from "../ui/organisms/ProducersReport";

export const TestArea = () => {
	// console.log("modulo en test: ", modulo);

	// const editar = () => {
	// 	editarPermisos();
	// };

	const cargarPermisos = () => {
		printDuplicatePermits();
	};

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

			<div className="row border rounded p-3 m-1 mt-5">
				<PermisosExcelModule />
			</div>

			<div className="row border rounded p-3 m-1 mt-5">
				<button className="btn btn-primary" onClick={cargarPermisos}>
					Permisos Duplicados
				</button>
			</div>

			{/* <div className="mt-5">
				<button onClick={editar} className="btn btn-primary">
					Editar
				</button>
			</div> */}
		</>
	);
};
