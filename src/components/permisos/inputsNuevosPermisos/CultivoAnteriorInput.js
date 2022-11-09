import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setCultivoAnteriorSelected } from "../../../actions/cultivos";

export const CultivoAnteriorInput = () => {
	const dispatch = useDispatch();

	const { cultivosAnteriores, cultivoAnterior } = useSelector((state) => state.altaPermisos);

	const handleSetCultivoAnterior = (e) => {
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
					tabIndex="5"
					name="nombreCultivoAnterior"
					value={cultivoAnterior}
					onChange={handleSetCultivoAnterior}
					list="cultivos"
				>
					<option hidden defaultValue="">
						Cultivo Anterior
					</option>

					{/* <option value={"SIN CULTIVO"}>SIN CULTIVO</option> */}

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
