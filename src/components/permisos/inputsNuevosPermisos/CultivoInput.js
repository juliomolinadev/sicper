import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
	closeCultivosModal,
	openCultivosModal,
	startLoadCultivos,
	unsetCultivoSelected
} from "../../../actions/cultivos";
import { useFormToUpper } from "../../../hooks/UseFormToUpper";

export const CultivoInput = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(unsetCultivoSelected());
		dispatch(closeCultivosModal());
	}, [dispatch]);

	const handleOpenCultivosModal = () => {
		handleLoadCultivos();
		if (cultivo.length > 0) {
			dispatch(openCultivosModal());
		} else {
			Swal.fire("Nada para buscar", "Ingrese nombre del cultivo", "warning");
		}
	};

	const { claveEntidad } = useSelector((state) => state.auth);
	const handleLoadCultivos = () => {
		dispatch(startLoadCultivos(cultivo.toUpperCase(), claveEntidad));
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

	const [formValues, handleInputChange] = useFormToUpper({
		cultivo: ""
	});

	const { cultivo } = formValues;

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			handleOpenCultivosModal();
		}
	};

	return (
		<div className="col-sm-6">
			<div className="form-group d-flex align-items-baseline row p-3">
				<label className="col-sm-3">
					<span className="text-warning">* </span>
					Cultivo:{" "}
				</label>
				<label className="">{cultivoLabel} </label>
				{idCultivoSelected ? <div className="fas fa-check text-success p-3"></div> : <></>}
				{idCultivoSelected ? (
					<></>
				) : (
					<div className="flex-grow-1">
						<input
							id="cultivoInput"
							tabIndex="2"
							type="text"
							className="form-control"
							placeholder="Clave o nombre del cultivo"
							name="cultivo"
							autoComplete="off"
							value={cultivo}
							onChange={handleInputChange}
							onKeyUp={handleKeyUp}
						/>
					</div>
				)}
				{idCultivoSelected ? (
					<button
						tabIndex="-1"
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={clearCultivoInput}
					>
						<i className="fas fa-trash"></i>
					</button>
				) : (
					<button
						tabIndex="-1"
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
