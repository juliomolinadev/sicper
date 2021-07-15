import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { useForm } from "../../../hooks/useForm";
import {
	openLocaltiesModal,
	startLoadLocalties,
	unsetLocaltieSelected
} from "../../../actions/entidades/localidades";

export const LocalidadInput = () => {
	const dispatch = useDispatch();

	const handleOpenLocaltiesModal = () => {
		handleLoadLocalties();
		if (localtie.length > 0) {
			dispatch(openLocaltiesModal());
		} else {
			Swal.fire("Nada para buscar", "Ingrese nombre de la localidad", "warning");
		}
	};

	const handleLoadLocalties = () => {
		dispatch(startLoadLocalties(localtie.toUpperCase()));
	};

	const { localtieSelected } = useSelector((state) => state.entidades);

	let localtieLabel = "";
	let idLocaltieSelected = "";

	if (localtieSelected) {
		localtieLabel = localtieSelected.nombre;
		idLocaltieSelected = localtieSelected.id;
	}

	const clearLocaltieInput = () => {
		dispatch(unsetLocaltieSelected());
		formValues.localtie = "";
	};

	const [formValues, handleInputChange] = useForm({
		localtie: ""
	});

	const { localtie } = formValues;

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			handleOpenLocaltiesModal();
		}
	};

	return (
		<>
			<div className="form-group d-flex align-items-baseline row p-3">
				<label>
					<span className="text-warning">* </span>
					Localidad destino:{" "}
				</label>

				{idLocaltieSelected ? <div className="fas fa-check text-success p-3"></div> : <></>}

				{idLocaltieSelected ? (
					<button
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={clearLocaltieInput}
					>
						<i className="fas fa-trash"></i>
					</button>
				) : (
					<button
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={handleOpenLocaltiesModal}
					>
						<i className="fas fa-search"></i>
					</button>
				)}

				<label className="">{localtieLabel} </label>
				{idLocaltieSelected ? (
					<></>
				) : (
					<div className="flex-grow-1">
						<input
							type="text"
							className="form-control"
							placeholder="Localidad"
							name="localtie"
							autoComplete="off"
							value={localtie}
							onChange={handleInputChange}
							onKeyUp={handleKeyUp}
						/>
					</div>
				)}
			</div>
		</>
	);
};
