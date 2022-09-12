import React from "react";
import { saveDictamen } from "../../helpers/saveDictamen";
import { useForm } from "../../hooks/useForm";

export const DictamenManual = () => {
	const [formValues, handleInputChange] = useForm();
	const { cuenta = "", estado = "" } = formValues;

	const handleSaveDictamen = () => {
		if (estado.length > 0) {
			saveDictamen(cuenta, "2022-2023", formValues);
		}
	};

	return (
		<>
			<div className="row p-2">
				<h2>Guardar Dictamen</h2>
			</div>

			<div className="row">
				<div className="col-4">
					Cuenta:
					<input
						type="text"
						className="form-control"
						placeholder="cuenta"
						name="cuenta"
						value={cuenta}
						autoComplete="waa"
						onChange={handleInputChange}
					/>
				</div>

				<div className="col-4">
					<select
						name="estado"
						id="estado"
						type="text"
						value={estado}
						onChange={handleInputChange}
						className="form-control mt-4"
					>
						<option hidden defaultValue="">
							Seleccionar estado
						</option>
						<option value="activo">activo</option>
						<option value="cancelado">cancelado</option>
					</select>
				</div>

				<div className="col-4">
					<button
						type="submit"
						className="btn btn-outline-primary d-flex"
						onClick={handleSaveDictamen}
					>
						<span> Guardar</span>
					</button>
				</div>
			</div>
		</>
	);
};
