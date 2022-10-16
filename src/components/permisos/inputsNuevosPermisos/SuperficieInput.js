import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setComplemento } from "../../../actions/altaPermisos";
import { setPermisosComplemento } from "../../../actions/productores";
import { roundToN } from "../../../helpers/functions/roundToN";

export const SuperficieInput = ({ formValues, handleInputChange, setValues }) => {
	const { supAutorizada } = formValues;

	const {
		claveCultivo,
		supDerecho,
		supPrevia,
		cultivos,
		supComplementoRequerida,
		restoSupComplementoRequerida,
		complementosProductor,
		permisosComplemento
	} = useSelector((state) => state.altaPermisos);

	const cultivoSelected = cultivos.find((cultivo) => cultivo.clave === claveCultivo);
	const complementosDisponibles =
		complementosProductor && cultivoSelected
			? complementosProductor.filter(
					(complemento) => complemento.claveCultivo === cultivoSelected.cultivoComplementario
			  )
			: false;
	const supComplemento = permisosComplemento.reduce(
		(total, permiso) => total + permiso.supAutorizada,
		0
	);

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
					supComplementoRequerida: complemento.supComplementoRequerida,
					restoSupComplementoRequerida: complemento.restoSupComplementoRequerida
				})
			);
		}
	}, [dispatch, supAutorizada, cultivoSelected, supDerecho, supPrevia]);

	const handleSetPermisosComplemento = (e) => {
		const complemento = complementosDisponibles.find((permiso) => permiso.id === e.target.value);
		const isSelected = permisosComplemento.find((permiso) => permiso.id === e.target.value);

		if (isSelected) {
			const nuevosComplementos = permisosComplemento.filter(
				(permiso) => permiso.id !== e.target.value
			);

			dispatch(setPermisosComplemento(nuevosComplementos));

			let textoComplementos = "";

			nuevosComplementos.forEach((complemento) => {
				textoComplementos = `${textoComplementos} ${complemento.supAutorizada} Ha de complemento de volumen de la cuenta "${complemento.cuenta}" con el permiso "${complemento.id}". `;
			});

			setValues({
				...formValues,
				observaciones: textoComplementos
			});
		} else {
			const nuevosComplementos = [...permisosComplemento];
			nuevosComplementos.push(complemento);

			dispatch(setPermisosComplemento(nuevosComplementos));

			let textoComplementos = "";

			nuevosComplementos.forEach((complemento) => {
				textoComplementos = `${textoComplementos} ${complemento.supAutorizada} Ha de complemento de volumen de la cuenta "${complemento.cuenta}" con el permiso "${complemento.id}". `;
			});

			setValues({
				...formValues,
				observaciones: textoComplementos
			});
		}
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
				supComplementoRequerida: complemento.supComplementoRequerida,
				restoSupComplementoRequerida: complemento.restoSupComplementoRequerida
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
							<div>Complemento Requerido: {supComplementoRequerida} (Ha)</div>
						</div>
						<div className="col-sm-5 m-0 p-0">
							<div className={restoSupComplementoRequerida < 0 ? "text-danger" : ""}>
								Superficie Restante: {restoSupComplementoRequerida} (Ha)
							</div>
						</div>
					</div>

					{complementosDisponibles && (
						<div className="mb-5">
							<div className="mb-3">
								<span className="text-warning">* </span> Permisos Complemento:
							</div>

							{complementosDisponibles.map((permiso) => (
								<div key={permiso.id} className="form-group form-check">
									<input
										type="checkbox"
										className="form-check-input"
										id={permiso.id}
										name="permisoComplemento"
										value={permiso.id}
										onChange={handleSetPermisosComplemento}
										checked={
											permisosComplemento.find(
												(permisoComplemento) => permisoComplemento.id === permiso.id
											)
												? true
												: false
										}
									/>
									<label className="form-check-label" htmlFor={permiso.id}>
										{permiso.id} {permiso.supAutorizada} Ha
									</label>
								</div>
							))}

							{permisosComplemento && (
								<div className="d-flex">
									<div>Superficie de los permisos complemento: </div>
									<div
										className={`ml-2 ${
											supComplemento >= supComplementoRequerida ? "text-success" : "text-danger"
										}`}
									>
										{supComplemento} (Ha)
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
	const supComplementoRequerida = roundToN(supAutorizada * complementoPorHa, 3);
	const restoSupComplementoRequerida = roundToN(
		supDerecho - supPrevia - supAutorizada - supComplementoRequerida,
		3
	);

	return { supMaxima, supComplementoRequerida, restoSupComplementoRequerida };
};
