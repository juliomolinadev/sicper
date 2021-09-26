import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
	openLocaltiesModal,
	startLoadLocalties,
	unsetLocaltieSelected
} from "../../../actions/entidades/localidades";

export const LocalidadInput = ({ localtie, handleInputChange }) => {
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
	};

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			handleOpenLocaltiesModal();
		}
	};

	return (
		<div className="form-group d-flex flex-column row p-3">
			<label className="mr-2">
				<span className="text-warning">* </span>
				Localidad destino:
			</label>

			{idLocaltieSelected ? (
				<div className="d-flex align-items-baseline">
					<label>{localtieLabel} </label>

					<i className="fas fa-check text-success p-3"></i>

					<button
						className="btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={clearLocaltieInput}
					>
						<i className="fas fa-trash"></i>
					</button>
				</div>
			) : (
				<div className="d-flex">
					<input
						type="text"
						className="form-control d-flex"
						placeholder="Localidad"
						name="localtie"
						autoComplete="off"
						value={localtie}
						onChange={handleInputChange}
						onKeyUp={handleKeyUp}
					/>

					<button
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={handleOpenLocaltiesModal}
					>
						<i className="fas fa-search"></i>
					</button>
				</div>
			)}
		</div>
	);
};
