import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCultivoAnteriorSelected } from "../../../actions/cultivos";

export const CultivoAnteriorInput = () => {
	const dispatch = useDispatch();

	const { cultivosAnteriores } = useSelector((state) => state.altaPermisos);

	const [nombreCultivoAnterior, setNombreCultivoAnterior] = useState("");

	const handleSetCultivoAnterior = (e) => {
		setNombreCultivoAnterior(e.target.value);
		dispatch(
			setCultivoAnteriorSelected(
				cultivosAnteriores.find((cultivo) => cultivo.nombre === e.target.value)
			)
		);
	};

	return (
		<div className="col-sm-6">
			<label htmlFor="cultivos" className="d-flex">
				<div>
					<span className="text-warning">* </span> Cultivo Anterior:
				</div>
				<select
					className="form-control ml-4 w-75"
					name="nombreCultivoAnterior"
					value={nombreCultivoAnterior}
					onChange={handleSetCultivoAnterior}
					// onKeyUp={handleKeyUp}
					list="cultivos"
				>
					<option hidden defaultValue="">
						Cultivo Anterior
					</option>

					{cultivosAnteriores.map((cultivo) => (
						<option key={cultivo.id} value={cultivo.nombre}>
							{cultivo.nombre}
						</option>
					))}
				</select>
			</label>
		</div>
	);
};
