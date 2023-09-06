import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCicloConsulta } from "../../../actions/auth";

export const CicleSelector = () => {
	const { cicloConsulta } = useSelector((state) => state.auth.variablesGlobales);

	const [ciclo, setCiclo] = useState(cicloConsulta);
	const dispatch = useDispatch();

	const handleSetCiclo = ({ target }) => {
		setCiclo(target.value);
		dispatch(setCicloConsulta(target.value));
	};

	return (
		<select
			name="ciclo"
			id="ciclo"
			type="text"
			value={ciclo}
			onChange={handleSetCiclo}
			className="form-control"
		>
			<option hidden defaultValue="">
				Ciclo
			</option>

			<option value="2023-2024">2023-2024</option>
			<option value="2022-2023">2022-2023</option>
			<option value="2021-2022">2021-2022</option>
		</select>
	);
};
