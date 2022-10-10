import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComplemento, setOpcionDeExpedicion } from "../../../actions/altaPermisos";
import { roundToN } from "../../../helpers/functions/roundToN";

export const SuperficieInput = ({ formValues, handleInputChange, setValues }) => {
	const { supAutorizada } = formValues;

	const {
		claveCultivo,
		supDerecho,
		supPrevia,
		cultivos,
		supComplemento,
		restoSupComplemento,
		opcionDeExpedicion
	} = useSelector((state) => state.altaPermisos);

	const cultivoSelected = cultivos.find((cultivo) => cultivo.clave === claveCultivo);

	const dispatch = useDispatch();

	useEffect(() => {
		if (cultivoSelected) {
			const complemento = getComplemento(
				supDerecho,
				supPrevia,
				supAutorizada,
				cultivoSelected.complementoPorHa
			);

			dispatch(
				setComplemento({
					supComplemento: complemento.supComplemento,
					restoSupComplemento: complemento.restoSupComplemento
				})
			);
		}
	}, [dispatch, supAutorizada, cultivoSelected, supDerecho, supPrevia]);

	const handleSetOpcionDeExpedicion = ({ target }) => {
		dispatch(setOpcionDeExpedicion(target.name));

		if (target.name === "complementoPropio") {
			const complemento = getComplemento(
				supDerecho,
				supPrevia,
				supAutorizada,
				cultivoSelected.complementoPorHa
			);

			setValues({ ...formValues, supAutorizada: complemento.supMaxima });

			dispatch(
				setComplemento({
					supComplemento: complemento.supComplemento,
					restoSupComplemento: complemento.restoSupComplemento
				})
			);
		}
	};

	return (
		<div className="col-sm-6">
			{claveCultivo === 51 ? (
				<>
					<div className="form-group d-flex align-items-baseline row p-3">
						<label className="col-sm-3">
							<span className="text-warning">* </span>
							Tipo de expedición:{" "}
						</label>
						<div className="col-sm-4">
							<input
								type="radio"
								id="complementoPropio"
								name="complementoPropio"
								onChange={handleSetOpcionDeExpedicion}
								checked={opcionDeExpedicion === "complementoPropio"}
								value={opcionDeExpedicion}
							/>{" "}
							<label htmlFor="complementoPropio"> Complemento Propio </label>
						</div>
						<div className="col-sm-4">
							<input
								type="radio"
								id="complementoExterno"
								name="complementoExterno"
								onChange={handleSetOpcionDeExpedicion}
								checked={opcionDeExpedicion === "complementoExterno"}
								value={opcionDeExpedicion}
							/>{" "}
							<label htmlFor="complementoExterno"> Complemento Externo </label>
						</div>
					</div>

					{opcionDeExpedicion === "complementoPropio" ? (
						<div className="form-group d-flex align-items-baseline row p-3">
							<div className="form-group d-flex align-items-baseline row p-3">
								<label className="col-sm-3">
									<span className="text-warning">* </span>
									Superficie:
								</label>

								<div className="flex-grow-1 col-sm-4">
									<input
										id="superficieInput"
										tabIndex="3"
										type="number"
										className="form-control"
										placeholder="superficie"
										name="supAutorizada"
										value={supAutorizada}
										autoComplete="off"
										onChange={handleInputChange}
									/>
								</div>

								<div className="col-sm-5 p-0">
									<div>Complemento: {supComplemento}</div>
									<div className={restoSupComplemento < 0 ? "text-danger" : ""}>
										Restante: {restoSupComplemento}
									</div>
								</div>
							</div>
						</div>
					) : (
						<div className="form-group d-flex align-items-baseline row p-3">
							Complemento Externo
						</div>
					)}
				</>
			) : (
				<div className="form-group d-flex align-items-baseline row p-3">
					<label className="col-sm-3">
						<span className="text-warning">* </span>
						Superficie:
					</label>

					<div className="flex-grow-1">
						<input
							id="superficieInput"
							tabIndex="3"
							type="number"
							className="form-control"
							placeholder="superficie"
							name="supAutorizada"
							value={supAutorizada}
							autoComplete="off"
							onChange={handleInputChange}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

const getComplemento = (supDerecho, supPrevia, supAutorizada, complementoPorHa) => {
	const supMaxima = roundToN((supDerecho - supPrevia) / (complementoPorHa + 1), 3);
	const supComplemento = roundToN(supAutorizada * complementoPorHa, 3);
	const restoSupComplemento = roundToN(supDerecho - supPrevia - supAutorizada - supComplemento, 3);

	return { supMaxima, supComplemento, restoSupComplemento };
};
