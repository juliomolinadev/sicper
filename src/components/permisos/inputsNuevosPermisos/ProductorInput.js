import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../../hooks/useForm";
import {
	openProductoresModal,
	startLoadProductores,
	unsetProductorSelected
} from "../../../actions/productores";

export const ProductorInput = () => {
	const dispatch = useDispatch();

	const handleOpenProductoresModal = () => {
		handleLoadProductores();
		dispatch(openProductoresModal());
	};

	const handleLoadProductores = () => {
		dispatch(startLoadProductores(productor.toUpperCase()));
	};

	const { productorSelected } = useSelector((state) => state.altaPermisos);

	const clearProductorInput = () => {
		dispatch(unsetProductorSelected());
		formValues.productor = "";
	};

	const [formValues, handleInputChange] = useForm({
		productor: ""
	});

	const { productor } = formValues;

	return (
		<div className="col-sm-6">
			<div className="form-group d-flex align-items-baseline row p-3">
				<label className="col-sm-3">Productor: </label>
				<label>{productorSelected} </label>
				{productorSelected ? <div className="fas fa-check text-success p-3"></div> : <></>}
				{productorSelected ? (
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
						/>
					</div>
				)}
				{productorSelected ? (
					<button
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={clearProductorInput}
					>
						<i className="fas fa-redo"></i>
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
			</div>
		</div>
	);
};
