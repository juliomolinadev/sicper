import React from "react";
import { useDispatch, useSelector } from "react-redux";
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
		dispatch(openCultivosModal());
	};

	const handleLoadCultivos = () => {
		dispatch(startLoadCultivos(cultivo.toUpperCase()));
	};

	const { cultivoSelected } = useSelector((state) => state.altaPermisos);

	const clearCultivoInput = () => {
		dispatch(unsetCultivoSelected());
		formValues.cultivo = "";
	};

	const [formValues, handleInputChange] = useForm({
		cultivo: ""
	});

	const { cultivo } = formValues;

	return (
		<div className="col-sm-6">
			<div className="form-group d-flex align-items-baseline row p-3">
				<label className="col-sm-3">Cultivo: </label>
				<label className="">{cultivoSelected} </label>
				{cultivoSelected ? <div className="fas fa-check text-success p-3"></div> : <></>}
				{cultivoSelected ? (
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
						/>
					</div>
				)}
				{cultivoSelected ? (
					<button
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={clearCultivoInput}
					>
						<i className="fas fa-redo"></i>
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
