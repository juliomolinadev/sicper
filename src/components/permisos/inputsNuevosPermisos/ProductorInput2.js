import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../hooks/useForm";
import Swal from "sweetalert2";

import {
	openProductoresModal,
	startLoadProductores,
	unsetProductorSelected
} from "../../../actions/productores";

export const ProductorInput2 = () => {
	const dispatch = useDispatch();

	const handleOpenProductoresModal = () => {
		handleLoadProductores();
		if (productor.length > 0) {
			dispatch(openProductoresModal());
		} else {
			Swal.fire("Nada para buscar", "Ingrese apellido paterno del productor", "warning");
		}
	};

	const handleLoadProductores = () => {
		dispatch(startLoadProductores(productor.toUpperCase()));
	};

	const { idProductorSelected, nombreProductor } = useSelector((state) => state.altaPermisos);

	let productorLabel = "";

	if (idProductorSelected) {
		productorLabel = nombreProductor;
	}

	const clearProductorInput = () => {
		dispatch(unsetProductorSelected());
		formValues.productor = "";
	};

	const [formValues, handleInputChange] = useForm({
		productor: ""
	});

	const { productor } = formValues;

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			handleOpenProductoresModal();
		}
	};

	return (
		<>
			<div className="form-group d-flex align-items-baseline row p-3">
				<label>* Productor: </label>

				{idProductorSelected ? <div className="fas fa-check text-success p-3"></div> : <></>}

				{idProductorSelected ? (
					<button
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={clearProductorInput}
					>
						<i className="fas fa-trash"></i>
					</button>
				) : (
					<button
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={handleOpenProductoresModal}
					>
						<i className="fas fa-search"></i>
					</button>
				)}

				<label>{productorLabel} </label>
				{idProductorSelected ? (
					<></>
				) : (
					<div className="flex-grow-1">
						<input
							type="text"
							className="form-control"
							placeholder="Apellido paterno"
							name="productor"
							autoComplete="off"
							value={productor}
							onChange={handleInputChange}
							onKeyUp={handleKeyUp}
						/>
					</div>
				)}
			</div>
		</>
	);
};
