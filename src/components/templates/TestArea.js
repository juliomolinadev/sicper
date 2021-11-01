import React from "react";
// import { useSelector } from "react-redux";
// import { verificarExpedicion } from "../../helpers/DB/DBTools/verificarExpedicion";
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

			{/* <button
				onClick={() => verificarExpedicion(modulo, "2021-2022", false)}
				className="btn btn-primary mt-5"
			>
				Actualizar
			</button> */}
		</>
	);
};
