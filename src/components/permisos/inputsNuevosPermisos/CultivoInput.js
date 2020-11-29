import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { useForm } from "../../../hooks/useForm";
import {
	openCultivosModal,
	startLoadCultivos,
	unsetCultivoSelected
} from "../../../actions/cultivos";

export const CultivoInput = () => {
	const dispatch = useDispatch();

	const handleOpenCultivosModal = () => {
		handleLoadCultivos();
		if (cultivo.length > 0) {
			dispatch(openCultivosModal());
		} else {
			Swal.fire("Nada para buscar", "Ingrese nombre del cultivo", "warning");
		}
	};

	const handleLoadCultivos = () => {
		dispatch(startLoadCultivos(cultivo.toUpperCase()));
	};

	const { idCultivoSelected, nombreCultivo } = useSelector((state) => state.altaPermisos);

	let cultivoLabel = "";

	if (idCultivoSelected) {
		cultivoLabel = nombreCultivo;
	}

	const clearCultivoInput = () => {
		dispatch(unsetCultivoSelected());
		formValues.cultivo = "";
	};

	const [formValues, handleInputChange] = useForm({
		cultivo: ""
	});

	const { cultivo } = formValues;

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			handleOpenCultivosModal();
		}
	};

	return (
		<div className="col-sm-6">
			<div className="form-group d-flex align-items-baseline row p-3">
				<label className="col-sm-3">Cultivo: </label>
				<label className="">{cultivoLabel} </label>
				{idCultivoSelected ? <div className="fas fa-check text-success p-3"></div> : <></>}
				{idCultivoSelected ? (
					<></>
				) : (
					<div className="flex-grow-1">
						<input
							type="text"
							className="form-control"
							placeholder="Cultivo"
							name="cultivo"
							autoComplete="off"
							value={cultivo}
							onChange={handleInputChange}
							onKeyDown={handleKeyDown}
						/>
					</div>
				)}
				{idCultivoSelected ? (
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
						onClick={handleOpenCultivosModal}
					>
						<i className="fas fa-search"></i>
					</button>
				)}
			</div>
		</div>
	);
};
