import React, { useState } from "react";
import { useSelector } from "react-redux";

import { verificarExpedicion } from "../../helpers/DB/DBTools/verificarExpedicion";

export const ExpeditionCheckModule = () => {
	const { modulo } = useSelector((state) => state.auth);
	const [update, setUpdate] = useState(false);
	const handleUpdateMode = () => {
		setUpdate(!update);
	};

	return (
		<>
			<h3>Verificar expedicion</h3>

			<div className="col-12 d-flex">
				<h5>Modulo: {modulo}</h5>

				<button className="btn btn-outline-primary ml-4" onClick={handleUpdateMode}>
					Modo:
				</button>

				<button
					// Solo imprime la tabla si hay diferencias
					onClick={() => verificarExpedicion(modulo, "2022-2023", update)}
					className="btn btn-primary ml-5"
				>
					{update ? "Actualizar" : "Revisar"}
				</button>
			</div>
		</>
	);
};
