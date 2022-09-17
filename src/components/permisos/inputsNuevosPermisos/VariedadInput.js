import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTipoSemilla } from "../../../actions/cultivos";

export const VariedadInput = ({ variedad, handleInputChange }) => {
	const { claveCultivo } = useSelector((state) => state.altaPermisos);

	const [checkTipo, setCheckTipo] = useState("");

	const dispatch = useDispatch();

	const handleSetTipoSemilla = ({ target }) => {
		setCheckTipo(target.name);
		dispatch(setTipoSemilla(target.name));
	};

	return (
		<>
			<div className="col-sm-6">
				<div className="form-group d-flex align-items-baseline row p-3">
					<label className="col-sm-3">
						<span className="text-warning">* </span>
						Variedad:
					</label>
					<div className="flex-grow-1 ">
						<input
							id="variedadInput"
							tabIndex="6"
							type="text"
							className="form-control"
							placeholder="variedad"
							name="variedad"
							value={variedad}
							autoComplete="off"
							onChange={handleInputChange}
						/>
					</div>
				</div>
			</div>

			{claveCultivo === 3 && (
				<div className="col-sm-6">
					<div className="form-group d-flex align-items-baseline row p-3">
						<label className="col-sm-3">
							<span className="text-warning">* </span>
							Tipo:{" "}
						</label>
						<div className="col-sm-3">
							<input
								type="radio"
								id="variedadTrigo"
								name="panificable"
								onChange={handleSetTipoSemilla}
								checked={checkTipo === "panificable"}
								value={checkTipo}
							/>{" "}
							<label htmlFor="panificable"> Panificable </label>
						</div>
						<div className="col-sm-3">
							<input
								type="radio"
								id="variedadTrigo"
								name="cristalino"
								onChange={handleSetTipoSemilla}
								checked={checkTipo === "cristalino"}
								value={checkTipo}
							/>{" "}
							<label htmlFor="cristalino"> Cristalino </label>
						</div>
						<div className="col-sm-3">
							<input
								type="radio"
								id="variedadTrigo"
								name="semilla"
								onChange={handleSetTipoSemilla}
								checked={checkTipo === "semilla"}
								value={checkTipo}
							/>{" "}
							<label htmlFor="semilla"> Semilla </label>
						</div>
					</div>
				</div>
			)}

			{claveCultivo === 80 && (
				<div className="col-sm-6">
					<div className="form-group d-flex align-items-baseline row p-3">
						<label className="col-sm-3">
							<span className="text-warning">* </span>
							Tipo:{" "}
						</label>
						<div className="col-sm-3">
							<input
								type="radio"
								id="variedadAlgodon"
								name="transgenico"
								onChange={handleSetTipoSemilla}
								checked={checkTipo === "transgenico"}
								value={checkTipo}
							/>{" "}
							<label htmlFor="transgenico"> Transgénico </label>
						</div>
						<div className="col-sm-3">
							<input
								type="radio"
								id="variedadAlgodon"
								name="convencional"
								onChange={handleSetTipoSemilla}
								checked={checkTipo === "convencional"}
								value={checkTipo}
							/>{" "}
							<label htmlFor="convencional"> Convencional </label>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
