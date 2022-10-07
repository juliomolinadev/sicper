import React from "react";
import { useEffect } from "react";
import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useSelector } from "react-redux";
// import { startSaveConcesion } from "../../actions/padronScreenActions";

// import { setError } from "../../actions/ui";

export const ConcesionCard = ({ concesion }) => {
	const { id, curp, nombre, cultivo, modulo, ciclo, supConcesion, supExpedida } = concesion;
	const { msgError } = useSelector((state) => state.ui);

	const [supConcesionInput, setSupConcesionInput] = useState(supConcesion);
	useEffect(() => {
		setSupConcesionInput(supConcesion);
	}, [supConcesion]);

	// const dispatch = useDispatch();

	// const handleSaveConcesion = () => {
	// 	if (isFormValid())
	// 		dispatch(
	// 			startSaveConcesion({
	// 				...concesion,
	// 				supConcesion: supConcesionInput
	// 			})
	// 		);
	// };

	// const isFormValid = () => {
	// 	if (supConcesion < 0) {
	// 		dispatch(setError("La concesión de superficie no puede ser negativa."));
	// 		return false;
	// 	}

	// 	if (supConcesion - supExpedida < 0) {
	// 		dispatch(setError("La concesión de superficie no puede ser menor a la superficie expedida."));
	// 		return false;
	// 	}

	// 	return true;
	// };

	return (
		<div className="border border-info rounded">
			<div className="border-bottom border-info p-2">
				<div className="d-flex justify-content-center">
					<h4>{id}</h4>
				</div>
			</div>

			<div className="d-flex flex-column border-bottom border-info p-2 pt-4 pb-4">
				{msgError && <div className="auth__alert-error">{msgError}</div>}

				<div className=" row mt-2">
					<label className="col-4">CURP:</label>
					<div className="col-7 ml-1">{curp}</div>
				</div>

				<div className=" row mt-2">
					<label className="col-4">Nombre:</label>
					<div className="col-7 ml-1">{nombre}</div>
				</div>

				<div className=" row mt-2">
					<label className="col-4">Cultivo:</label>
					<div className="col-7 ml-1">{cultivo}</div>
				</div>

				<div className=" row mt-2">
					<label className="col-4">Móduo:</label>
					<div className="col-7 ml-1">{modulo}</div>
				</div>

				<div className=" row mt-2">
					<label className="col-4">Ciclo:</label>
					<div className="col-7 ml-1">{ciclo}</div>
				</div>

				<div className=" row mt-3">
					<label className="col-4">Concesión (Ha):</label>
					<input
						type="number"
						className="col-7 form-control ml-1"
						placeholder="Superficie en Concesión"
						name="supConcesion"
						autoComplete="off"
						value={supConcesionInput}
						onChange={(e) => setSupConcesionInput(Number(e.target.value))}
					/>
				</div>

				<div className=" row mt-2">
					<label className="col-4">Expedida (Ha):</label>
					<div className="col-7 ml-1">{supExpedida}</div>
				</div>

				<div className=" row mt-2">
					<label className="col-4">Restante (Ha):</label>
					<div className="col-7 ml-1">{supConcesionInput - supExpedida}</div>
				</div>
			</div>

			<div className="d-flex flex-column border-bottom border-info p-4">
				{/* <button
					type="button"
					className="btn btn-outline-primary mt-4"
					onClick={handleSaveConcesion}
				>
					<i className="fas fa-save"></i>
					<span> Guardar</span>
				</button> */}
			</div>
		</div>
	);
};