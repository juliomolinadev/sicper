import React from "react";
// import { useSelector } from "react-redux";
// import { editarEnPermisos } from "../../helpers/DB/DBTools/editarEnPermisos";
import { ProducersReport } from "../ui/organisms/ProducersReport";

export const TestArea = () => {
	// const { modulo } = useSelector((state) => state.auth);
	// console.log("modulo en test: ", modulo);
	return (
		<>
			<div className="row justify-content-center pt-5">
				<h1>TestArea</h1>
			</div>

			<div className="row">
				<ProducersReport />
			</div>

			{/* <button onClick={() => editarEnPermisos(modulo)} className="btn btn-primary mt-5">
				Actualizar
			</button> */}
		</>
	);
};
