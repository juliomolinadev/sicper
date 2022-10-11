import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComplemento } from "../../../actions/altaPermisos";
import { setPermisoComplemento } from "../../../actions/productores";
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
		complementosProductor,
		permisoComplemento
	} = useSelector((state) => state.altaPermisos);

	const cultivoSelected = cultivos.find((cultivo) => cultivo.clave === claveCultivo);
	const complementosDisponibles =
		complementosProductor && cultivoSelected
			? complementosProductor.filter(
					(complemento) => complemento.claveCultivo === cultivoSelected.cultivoComplementario
			  )
			: false;

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

	const handleSetPermisoComplemento = (e) => {
		const complemento = complementosDisponibles.find((permiso) => permiso.id === e.target.value);
		dispatch(setPermisoComplemento(complemento));

		setValues({
			...formValues,
			observaciones: `${complemento.supAutorizada}Ha de complemento de volumen de la cuenta "${complemento.cuenta}" con el permiso "${complemento.id}"`
		});
	};

	const setComplementoPropio = () => {
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
	};

	return (
		<div className="col-sm-6">
			{cultivoSelected && cultivoSelected.requiereComplementoVolumen ? (
				<>
					<div className="form-group d-flex align-items-baseline row">
						<label className="col-sm-3">
							<span className="text-warning">* </span>
							Superficie:
						</label>

						<div className="col-sm-4">
							<div className="btn btn-outline-primary btn-sm" onClick={setComplementoPropio}>
								Complemento Propio
							</div>
						</div>

						<div className="flex-grow-1 col-sm-5">
							<input
								id="superficieInput"
								tabIndex="4"
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

					<div className="form-group d-flex align-items-baseline row">
						<div className="col-sm-7">
							<div>Complemento Requerido: {supComplemento} (Ha)</div>
						</div>
						<div className="col-sm-5 m-0 p-0">
							<div className={restoSupComplemento < 0 ? "text-danger" : ""}>
								Superficie Restante: {restoSupComplemento} (Ha)
							</div>
						</div>
					</div>

					{complementosDisponibles && (
						<div className="mb-5">
							<label htmlFor="permisosComplemento" className="d-flex">
								<div>
									<span className="text-warning">* </span> Permiso Complemento:
								</div>
								<select
									className="form-control ml-4 w-75"
									name="permisoComplemento"
									value={permisoComplemento ? permisoComplemento.id : ""}
									onChange={handleSetPermisoComplemento}
									list="permisosComplemento"
								>
									<option hidden defaultValue="">
										Permiso Complemento
									</option>

									{complementosDisponibles.map((permiso) => (
										<option key={permiso.id} value={permiso.id}>
											{permiso.id}
										</option>
									))}
								</select>
							</label>

							{permisoComplemento && (
								<div className="d-flex">
									<div>Superficie del permiso complemento: </div>
									<div
										className={`ml-2 ${
											permisoComplemento.supAutorizada >= supComplemento
												? "text-success"
												: "text-danger"
										}`}
									>
										{permisoComplemento.supAutorizada} (Ha)
									</div>
								</div>
							)}
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
							tabIndex="4"
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
