import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { startSaveCultivo } from "../../actions/cultivos";
import { setError } from "../../actions/ui";
import { useFormToUpper } from "../../hooks/UseFormToUpper";
import { crearPadronDeCultivo } from "../../helpers/DB/crearPadronDeCultivo";
import { setCultivosConPadron } from "../../actions/padronScreenActions";

export const CultivoCard = ({ cultivo }) => {
	const { msgError } = useSelector((state) => state.ui);
	const { cicloActual } = useSelector((state) => state.auth.variablesGlobales);
	const { cultivos: cultivosConPadron } = useSelector((state) => state.padronScreen.padrones);
	const { cultivos } = useSelector((state) => state.altaPermisos);

	const cultivosComplemento = cultivos.filter((cultivo) => cultivo.nombre.includes("COMP."));

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
		complementoPorHa = 0,
		cultivoComplementario = 0,
		requiereControlCPUS = false
	} = values;

	const dispatch = useDispatch();

	useEffect(() => {
		if (cultivo.clave !== clave) {
			reset();
		}
	}, [cultivo, clave, reset]);

	const handleCrearPadron = () => {
		Swal.fire({
			title: "Atención!!",
			text: `Ha solicitado control de CPUS. Cuando un cultivo requiere control de CPUS se genera un padrón de productores para el cultivo. Los productores que soliciten la expedición de permiso de siembra para dicho cultivo no podrán expedir más superficie de la que tengan disponible en el padrón generado. El padrón se crea con base en la expedición del ciclo anterior. ¿Realmente desea generar el padrón?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si",
			cancelButtonText: "No"
		}).then(async ({ isConfirmed }) => {
			if (isConfirmed) {
				const isSave = await crearPadronDeCultivo(cicloActual, cultivo.clave, cultivo.nombre);
				if (isSave) {
					cultivosConPadron.push(cultivo.nombre);
					dispatch(setCultivosConPadron(cultivosConPadron));
				}
			}
		});
	};

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

		if (complementoPorHa < 0) {
			dispatch(setError("El complemento de volumen por hectárea no puede ser negativo."));
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

		if (requiereComplementoVolumen && complementoPorHa === 0) {
			dispatch(
				setError("Indique las hectáreas de complemento de volumen por hectárea de cultivo.")
			);
			return false;
		}

		if (requiereComplementoVolumen && cultivoComplementario === 0) {
			dispatch(setError("Indique el cultivo complementario."));
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
						name="requiereComplementoVolumen"
						value={requiereComplementoVolumen}
						onChange={handleInputChange}
						checked={requiereComplementoVolumen === true}
					/>
				</div>

				{requiereComplementoVolumen && (
					<>
						<div className=" row mt-2">
							<label className="col-7">Hectáreas de complemento por hectárea de cultivo:</label>
							<input
								type="number"
								className="col-4 form-control ml-1"
								placeholder="Complemento Por Ha"
								name="complementoPorHa"
								autoComplete="off"
								value={complementoPorHa}
								onChange={handleInputChange}
							/>
						</div>

						<div className=" row mt-2">
							<label className="col-5">Cultivo Complementario:</label>
							<select
								className="col-6 form-control ml-1"
								placeholder="Clave de Cultivo"
								name="cultivoComplementario"
								autoComplete="off"
								value={cultivoComplementario}
								onChange={handleInputChange}
							>
								<option hidden defaultValue="">
									Cultivo Complementario
								</option>

								{cultivosComplemento.map((cultivo) => (
									<option key={cultivo.id} value={cultivo.clave}>
										{cultivo.nombre}
									</option>
								))}
							</select>
						</div>
					</>
				)}

				<div className="row mt-2">
					<label className="col-9">Requiere control de CPUS:</label>
					<input
						type="checkbox"
						name="requiereControlCPUS"
						value={requiereControlCPUS}
						onChange={handleInputChange}
						checked={requiereControlCPUS === true}
					/>
				</div>

				{msgError && <div className="auth__alert-error mt-3">{msgError}</div>}
			</div>

			<div className="d-flex flex-column border-bottom border-info p-4">
				{!cultivosConPadron.find((cultivoConPadron) => cultivoConPadron === cultivo.nombre) && (
					<button
						type="button"
						className="btn btn-outline-primary mt-4"
						onClick={handleCrearPadron}
					>
						<i className="fas fa-file"></i>
						<span> Crear Padrón</span>
					</button>
				)}

				<button type="button" className="btn btn-outline-primary mt-4" onClick={handleSaveCultivo}>
					<i className="fas fa-save"></i>
					<span> Guardar</span>
				</button>
			</div>
		</div>
	);
};
