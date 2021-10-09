import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
	closeCultivoAnteriorModal,
	openCultivoAnteriorModal,
	startLoadCultivosAnteriores,
	unsetCultivoAnteriorSelected
} from "../../../actions/cultivos";
import { useFormToUpper } from "../../../hooks/UseFormToUpper";

export const CultivoAnteriorInput = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(unsetCultivoAnteriorSelected());
		dispatch(closeCultivoAnteriorModal());
	}, [dispatch]);

	const handleOpenCultivoAnteriorModal = () => {
		handleLoadCultivos();
		if (nombreCultivoAnterior.length > 0) {
			dispatch(openCultivoAnteriorModal());
		} else {
			Swal.fire("Nada para buscar", "Ingrese nombre del cultivo", "warning");
		}
	};

	const handleLoadCultivos = () => {
		dispatch(startLoadCultivosAnteriores(nombreCultivoAnterior.toUpperCase()));
	};

	const { idCultivoAnteriorSelected, cultivoAnterior } = useSelector((state) => state.altaPermisos);

	let cultivoLabel = "";

	if (idCultivoAnteriorSelected) {
		cultivoLabel = cultivoAnterior;
	}

	const clearCultivoInput = () => {
		dispatch(unsetCultivoAnteriorSelected());
		formValues.cultivoAnterior = "";
	};

	const [formValues, handleInputChange] = useFormToUpper({
		nombreCultivoAnterior: ""
	});

	const { nombreCultivoAnterior } = formValues;

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			handleOpenCultivoAnteriorModal();
		}
	};

	return (
		<div className="col-sm-6">
			<div className="form-group d-flex align-items-baseline row p-3">
				<label className="col-sm-3">
					<span className="text-warning">* </span>
					Cultivo Anterior:{" "}
				</label>
				<label className="">{cultivoLabel} </label>
				{idCultivoAnteriorSelected ? <div className="fas fa-check text-success p-3"></div> : <></>}
				{idCultivoAnteriorSelected ? (
					<></>
				) : (
					<div className="flex-grow-1">
						<input
							type="text"
							className="form-control"
							placeholder="Clave o nombre del cultivo"
							name="nombreCultivoAnterior"
							autoComplete="off"
							value={nombreCultivoAnterior}
							onChange={handleInputChange}
							onKeyUp={handleKeyUp}
						/>
					</div>
				)}
				{idCultivoAnteriorSelected ? (
					<button
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={clearCultivoInput}
					>
						<i className="fas fa-trash"></i>
					</button>
				) : (
					<button
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={handleOpenCultivoAnteriorModal}
					>
						<i className="fas fa-search"></i>
					</button>
				)}
			</div>
		</div>
	);
};
