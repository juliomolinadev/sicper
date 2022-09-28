import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveCultivo } from "../../actions/cultivos";
import { setError } from "../../actions/ui";
import { useFormToUpper } from "../../hooks/UseFormToUpper";

export const CultivoCard = ({ cultivo }) => {
	const { msgError } = useSelector((state) => state.ui);

	const [values, handleInputChange, reset] = useFormToUpper(cultivo);
	const {
		clave,
		costoGuia,
		costoHectarea,
		nombre,
		subciclo,
		inicioBc = "",
		finBc = "",
		inicioSonora = "",
		finSonora = "",
		requiereDictamen = false,
		requiereComplementoVolumen = false,
		requiereControlCPUS = false
	} = values;

	const dispatch = useDispatch();

	useEffect(() => {
		if (cultivo.clave !== clave) {
			reset();
		}
	}, [cultivo, clave, reset]);

	const handleSaveCultivo = () => {
		if (isFormValid()) {
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

		if (inicioBc.length === 0) {
			dispatch(setError("Indique la fecha de inicio de expedición del cultivo."));
			return false;
		}

		if (finBc.length === 0) {
			dispatch(setError("Indique la fecha de cierre de expedición del cultivo."));
			return false;
		}

		const f1Bc = new Date(inicioBc);
		const f2Bc = new Date(finBc);

		if (f1Bc > f2Bc) {
			dispatch(
				setError("La fecha de inicio para Baja California no puede ser mayor a la fecha final.")
			);
			return false;
		}

		const f1Sonora = new Date(inicioSonora);
		const f2Sonora = new Date(finSonora);

		if (f1Sonora > f2Sonora) {
			dispatch(setError("La fecha de inicio para Sonora no puede ser mayor a la fecha final."));
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
					<label className="col-5">Inicio BC:</label>
					<input
						type="date"
						className="col-6 form-control ml-1"
						name="inicioBc"
						value={inicioBc}
						onChange={handleInputChange}
					/>
				</div>

				<div className="row mt-2">
					<label className="col-5">Fin BC:</label>
					<input
						type="date"
						className="col-6 form-control ml-1"
						name="finBc"
						value={finBc}
						onChange={handleInputChange}
					/>
				</div>

				<div className="row mt-2">
					<label className="col-5">Inicio Sonora:</label>
					<input
						type="date"
						className="col-6 form-control ml-1"
						name="inicioSonora"
						value={inicioSonora}
						onChange={handleInputChange}
					/>
				</div>

				<div className="row mt-2">
					<label className="col-5">Fin Sonora:</label>
					<input
						type="date"
						className="col-6 form-control ml-1"
						name="finSonora"
						value={finSonora}
						onChange={handleInputChange}
					/>
				</div>

				<div className="row mt-4">
					<label className="col-9">Requiere dictamen técnico:</label>
					<input
						type="checkbox"
						// className="col-6 form-control ml-1"
						name="requiereDictamen"
						value={requiereDictamen}
						onChange={handleInputChange}
						checked={requiereDictamen === true}
					/>
				</div>

				<div className="row mt-2">
					<label className="col-9">Requiere complemento de volumen:</label>
					<input
						type="checkbox"
						// className="col-6 form-control ml-1"
						name="requiereComplementoVolumen"
						value={requiereComplementoVolumen}
						onChange={handleInputChange}
						checked={requiereComplementoVolumen === true}
					/>
				</div>

				<div className="row mt-2">
					<label className="col-9">Requiere control de CPUS:</label>
					<input
						type="checkbox"
						// className="col-6  ml-1"
						name="requiereControlCPUS"
						value={requiereControlCPUS}
						onChange={handleInputChange}
						checked={requiereControlCPUS === true}
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
