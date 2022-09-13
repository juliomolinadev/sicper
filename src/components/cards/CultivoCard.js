import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveCultivo } from "../../actions/cultivos";
import { setError } from "../../actions/ui";
import { useFormToUpper } from "../../hooks/UseFormToUpper";

export const CultivoCard = ({ cultivo }) => {
	const { msgError } = useSelector((state) => state.ui);

	const [values, handleInputChange, reset] = useFormToUpper(cultivo);
	const { clave, costoGuia, costoHectarea, nombre, subciclo, inicio = "", fin = "" } = values;

	const dispatch = useDispatch();

	useEffect(() => {
		if (cultivo.clave !== clave) {
			reset();
		}
	}, [cultivo, clave, reset]);

	const handleSaveCultivo = () => {
		if (isFormValid()) {
			console.log("Guardando...", { ...values });
			dispatch(startSaveCultivo(values));
		}
	};

	const isFormValid = () => {
		if (nombre.length === 0) {
			dispatch(setError("Indique el nombre del cultivo."));
			return false;
		}

		if (clave.length === 0) {
			dispatch(setError("Indique la clave del cultivo."));
			return false;
		}

		// if (cultivos.find((cultivo) => cultivo.clave === clave)) {
		// 	dispatch(setError("La clave del cultivo ya está en uso, indique una clave diferente."));
		// 	return false;
		// }

		if (costoGuia < 0) {
			dispatch(setError("El costo de la guía no puede ser negativo."));
			return false;
		}

		if (costoHectarea < 0) {
			dispatch(setError("El costo por hectárea no puede ser negativo."));
			return false;
		}

		if (subciclo.length === 0) {
			dispatch(setError("Seleccione el subciclo."));
			return false;
		}

		if (inicio.length === 0) {
			dispatch(setError("Indique la fecha de inicio de expedición del cultivo."));
			return false;
		}

		if (fin.length === 0) {
			dispatch(setError("Indique la fecha de cierre de expedición del cultivo."));
			return false;
		}

		const f1 = new Date(inicio);
		const f2 = new Date(fin);

		if (f1 > f2) {
			dispatch(setError("La fecha de inicio no puede ser mayor a la fecha final."));
			return false;
		}

		return true;
	};

	return (
		<div className="border border-info rounded">
			<div className="border-bottom border-info p-2">
				<div className="d-flex justify-content-center">
					<h4>{`${clave} - ${nombre}`}</h4>
				</div>
			</div>

			<div className="d-flex flex-column border-bottom border-info p-2 pt-4 pb-4">
				{msgError && <div className="auth__alert-error">{msgError}</div>}

				<div className=" row mt-2">
					<label className="col-5">Costo guía:</label>
					<input
						type="number"
						className="col-6 form-control ml-1"
						placeholder="Costo guía"
						name="costoGuia"
						autoComplete="off"
						value={costoGuia}
						onChange={handleInputChange}
						// onKeyUp={handleKeyUp}
					/>
				</div>

				<div className=" row mt-2">
					<label className="col-5">Costo Hectarea:</label>
					<input
						type="number"
						className="col-6 form-control ml-1"
						placeholder="Costo Hectarea"
						name="costoHectarea"
						autoComplete="off"
						value={costoHectarea}
						onChange={handleInputChange}
						// onKeyUp={handleKeyUp}
					/>
				</div>

				<div className=" row mt-2">
					<label className="col-5">Subciclo:</label>
					<select
						type="text"
						name="subciclo"
						value={subciclo}
						onChange={handleInputChange}
						className="col-6 form-control ml-1"
					>
						<option hidden defaultValue={false}>
							Subciclo
						</option>
						<option value="PERENNES">PERENNES</option>
						<option value="PRIMAVERA-VERANO">PRIMAVERA-VERANO</option>
						<option value="OTOÑO-INVIERNO">OTOÑO-INVIERNO</option>
					</select>
				</div>

				<div className="row mt-2">
					<label className="col-5">Inicio:</label>
					<input
						type="date"
						className="col-6 form-control ml-1"
						name="inicio"
						value={inicio}
						onChange={handleInputChange}
						// onKeyUp={handleKeyUp}
					/>
				</div>

				<div className="row mt-2">
					<label className="col-5">Fin:</label>
					<input
						type="date"
						className="col-6 form-control ml-1"
						name="fin"
						value={fin}
						onChange={handleInputChange}
						// onKeyUp={handleKeyUp}
					/>
				</div>
			</div>

			<div className="d-flex flex-column border-bottom border-info p-4">
				<button type="button" className="btn btn-outline-primary mt-4" onClick={handleSaveCultivo}>
					<i className="fas fa-save"></i>
					<span> Guardar</span>
				</button>
			</div>
		</div>
	);
};
