import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { CultivoModal } from "../modals/CultivoModal";
import { UsuarioModal } from "../modals/UsuarioModal";
import { ProductorModal } from "../modals/ProductorModal";
import { NuevoProductorModal } from "../modals/NuevoProductorModal";
import { PrintPermisoModal } from "../modals/PrintPermisoModal";
import { CultivoInput } from "./inputsNuevosPermisos/CultivoInput";
import { UsuarioInput } from "./inputsNuevosPermisos/UsuarioInput";
import { ProductorInput } from "./inputsNuevosPermisos/ProductorInput";
import { UsuarioSelected } from "./inputsNuevosPermisos/UsuarioSelected";
import { ProductorSelected } from "./inputsNuevosPermisos/ProductorSelected";
import {
	setFormValues,
	setOnSubmitData,
	openPrintPermisoModal,
	setCuotaCultivo,
	setTipoExtra,
	setTipoNormal,
} from "../../actions/altaPermisos";
import { loadContador } from "../../helpers/loadContador";
import { removeError, setError } from "../../actions/ui";

import { startLoadAutorizadoPorCultivo } from "../../actions/autorizadosScreen";
import { CultivoSelected } from "./inputsNuevosPermisos/CultivoSelected";
import { useFormToUpper } from "../../hooks/UseFormToUpper";
import { CultivoAnteriorModal } from "../modals/CultivoAnteriorModal";
import { roundToN } from "../../helpers/functions/roundToN";
import { unsetUsuarioSelected } from "../../actions/usuarios";
import { VariedadInput } from "./inputsNuevosPermisos/VariedadInput";
import { CultivoAnteriorInput } from "./inputsNuevosPermisos/CultivoAnteriorInput";
import { SuperficieInput } from "./inputsNuevosPermisos/SuperficieInput";

export const NuevoPermisoScreen = () => {
	const {
		idUsuarioSelected,
		idProductorSelected,
		idCultivoSelected,
		subciclo,
		nombreCultivo,
		superficiePreviaCultivo,
		usuarios,
		permisosComplemento,
	} = useSelector((state) => state.altaPermisos);
	const altaPermisos = useSelector((state) => state.altaPermisos);
	const auth = useSelector((state) => state.auth);
	const { variablesGlobales, expedicionActivaModulo } = auth;
	const { cicloActual: ciclo, expedicionActiva } = variablesGlobales;
	const { msgError } = useSelector((state) => state.ui);
	const { autorizadosPorCultivo } = useSelector((state) => state.autorizadosScreen);

	const supComplemento = permisosComplemento.reduce(
		(total, permiso) => total + permiso.supAutorizada,
		0
	);

	const usuarioSelected = usuarios.find((usuario) => usuario.id === idUsuarioSelected);

	const [formValues, handleInputChange, , , setValues] = useFormToUpper({
		variedad: "",
		supAutorizada: "",
		fuenteCredito: "",
		latitud: "",
		longitud: "",
		observaciones: "",
		transferencia: "",
		cuotaSanidad: true,
		localidadDestino: "",
		loteDestino: "",
	});

	const {
		variedad,
		supAutorizada,
		fuenteCredito,
		observaciones,
		transferencia,
		cuotaSanidad,
		localidadDestino,
		loteDestino,
	} = formValues;

	const permisoData = {
		...formValues,
		...altaPermisos,
		...auth,
	};

	const tipo = altaPermisos.tipo;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(removeError());
	}, [dispatch]);

	useEffect(() => {
		const claves = [];
		claves.push(altaPermisos.claveCultivo);

		if (
			altaPermisos.requiereComplementoVolumen &&
			altaPermisos.opcionDeExpedicion === "complementoPropio"
		) {
			const cultivo = altaPermisos.cultivos.find(
				(cultivo) => cultivo.clave === altaPermisos.claveCultivo
			);
			claves.push(cultivo.cultivoComplementario);
		}
		dispatch(startLoadAutorizadoPorCultivo(ciclo, auth.modulo, claves));
	}, [
		ciclo,
		dispatch,
		auth.modulo,
		altaPermisos.claveCultivo,
		altaPermisos.cultivos,
		altaPermisos.opcionDeExpedicion,
		altaPermisos.requiereComplementoVolumen,
	]);

	useEffect(() => {
		const cultivoSelected = altaPermisos.cultivos.find(
			(cultivo) => cultivo.id === altaPermisos.idCultivoSelected
		);

		const defineCuota = () => {
			if (!cuotaSanidad) return 0;
			if (altaPermisos.idCultivoSelected) return cultivoSelected.costoHectarea;
		};

		dispatch(setCuotaCultivo(defineCuota()));
	}, [
		ciclo,
		dispatch,
		altaPermisos.cuotaCultivo,
		cuotaSanidad,
		altaPermisos.cultivos,
		altaPermisos.idCultivoSelected,
	]);

	const handleOpenPrintPermisoModal = () => {
		dispatch(openPrintPermisoModal());
	};

	const onSendForm = async (e) => {
		if (await isFormValid()) {
			e.preventDefault();
			dispatch(setFormValues(formValues));
			dispatch(setOnSubmitData(await getOnSubmitData()));
			handleOpenPrintPermisoModal();
		}
	};

	const getRangoExpedicion = () => {
		switch (auth.modulo) {
			case "1":
			case "2":
			case "3":
			case "UNI03":
				return {
					inicio: altaPermisos.inicioSonora,
					fin: altaPermisos.finSonora,
				};

			default:
				return {
					inicio: altaPermisos.inicioBc,
					fin: altaPermisos.finBc,
				};
		}
	};

	const getFechaParaCicloActual = (rango, ciclo) => {
		const cicloSplit = ciclo.split("-");
		const inicioSplit = rango.inicio.split("-");
		const finSplit = rango.fin.split("-");

		const yearDifference = Number(finSplit[0]) - Number(inicioSplit[0]);

		switch (yearDifference) {
			case 1:
				return {
					inicio: new Date(`${cicloSplit[0]}-${inicioSplit[1]}-${inicioSplit[2]}T00:00:00`),
					fin: new Date(`${cicloSplit[1]}-${finSplit[1]}-${finSplit[2]}T00:00:00`),
				};

			case 0:
				if (
					finSplit[1] === "9" ||
					finSplit[1] === "10" ||
					finSplit[1] === "11" ||
					finSplit[1] === "12"
				) {
					return {
						inicio: new Date(`${cicloSplit[0]}-${inicioSplit[1]}-${inicioSplit[2]}T00:00:00`),
						fin: new Date(`${cicloSplit[0]}-${finSplit[1]}-${finSplit[2]}T00:00:00`),
					};
				} else
					return {
						inicio: new Date(`${cicloSplit[1]}-${inicioSplit[1]}-${inicioSplit[2]}T00:00:00`),
						fin: new Date(`${cicloSplit[1]}-${finSplit[1]}-${finSplit[2]}T00:00:00`),
					};

			default:
				return false;
		}
	};

	const bloquearPorPeriodoDeExpedicion = () => {
		const rango = getRangoExpedicion();

		if (rango.inicio && rango.fin) {
			const rangoActual = getFechaParaCicloActual(rango, ciclo);
			const hoy = new Date();

			if (rangoActual) {
				if (hoy < rangoActual.inicio) return true;
				if (hoy > rangoActual.fin) return true;
				else return false;
			} else return true;
		} else return true;
	};

	const bloquearPorDictamenTecnico = () => {
		if (altaPermisos.requiereDictamen) {
			if (
				altaPermisos.dictamen.estado === "activo" &&
				Number(altaPermisos.dictamen.cultivoDictamen) === altaPermisos.claveCultivo
			)
				return false;
			else return true;
		} else return false;
	};

	const bloquearPorControlCPUS = () => {
		if (altaPermisos.requiereControlCPUS) {
			if (!altaPermisos.concesionesProductor) return true; //Si el productor no aparece en el padron

			const concesion = altaPermisos.concesionesProductor.find(
				(concesion) =>
					concesion.cultivo === altaPermisos.nombreCultivo && concesion.modulo === `${auth.modulo}`
			);

			if (concesion === undefined) return true;

			if (Number(supAutorizada) <= concesion.supConcesion - concesion.supExpedida) return false;
			else return true;
		} else return false;
	};

	const isFormValid = () => {
		if (!expedicionActiva || !expedicionActivaModulo) {
			dispatch(setError("Expedición cerrada! Por el momento no es posible expedir permisos."));
			return false;
		} else if (!altaPermisos.usuario) {
			dispatch(setError("El campo usuario es obligatorio."));
			return false;
		} else if (usuarioSelected && usuarioSelected.folio && localidadDestino.length === 0) {
			dispatch(
				setError(
					"Los derechos de riego seleccionados provienen de una transferencia. Indique la localidad donde se aplicará la transferencia."
				)
			);
			return false;
		} else if (usuarioSelected && usuarioSelected.folio && loteDestino.length === 0) {
			dispatch(
				setError(
					"Los derechos de riego seleccionados provienen de una transferencia. Indique el lote donde se aplicará la transferencia."
				)
			);
			return false;
		} else if (!altaPermisos.nombreProductor) {
			dispatch(setError("El campo productor es obligatorio."));
			return false;
		} else if (altaPermisos.productorIncumplido) {
			dispatch(setError("Productor inhabilitado. Favor de comunicarse con SADER."));
			return false;
		} else if (!altaPermisos.nombreCultivo) {
			dispatch(setError("El campo cultivo es obligatorio."));
			return false;
		} else if (
			(altaPermisos.claveCultivo === 3 || altaPermisos.claveCultivo === 80) &&
			altaPermisos.tipoSemilla === undefined
		) {
			dispatch(setError("Indique el tipo de semilla."));
			return false;
		} else if (supAutorizada <= 0) {
			dispatch(setError("Ingrese la superficie que será autorizada en este permiso."));
			return false;
		} else if (altaPermisos.supDerecho - altaPermisos.supPrevia < parseInt(supAutorizada)) {
			dispatch(
				setError("La superficie excede la superficie disponible de la cuenta seleccionada.")
			);
			return false;
		} else if (
			altaPermisos.requiereComplementoVolumen &&
			altaPermisos.permisosComplemento.length === 0
		) {
			dispatch(
				setError(`El cultivo "${altaPermisos.nombreCultivo}" requiere complemento de volumen.`)
			);
			return false;
		} else if (
			altaPermisos.requiereComplementoVolumen &&
			supComplemento < altaPermisos.supComplementoRequerida
		) {
			dispatch(
				setError(
					"El complemento de volumen no es suficiente para la superficie solicitada. Reduzca la superficie o expida el complemento de volumen suficiente."
				)
			);
			return false;
		} else if (
			altaPermisos.laboresPendientes &&
			(!altaPermisos.superficieParcialLiberada || altaPermisos.superficieParcialLiberada === 0)
		) {
			dispatch(setError("La cuenta seleccionada tiene labores fitosanitarias pendientes."));
			return false;
		} else if (
			altaPermisos.laboresPendientes &&
			supAutorizada > altaPermisos.superficieParcialLiberada
		) {
			dispatch(
				setError(
					`La cuenta seleccionada tiene labores fitosanitarias pendientes. Solo tiene ${altaPermisos.superficieParcialLiberada} ha disponibles para expedición.`
				)
			);
			return false;
		} else if (!fuenteCredito) {
			dispatch(setError("Especifique la fuente de crédito."));
			return false;
		} else if (altaPermisos.cultivoAnterior === "") {
			dispatch(setError("Especifique el cultivo anterior."));
			return false;
		} else if (bloquearPorPeriodoDeExpedicion()) {
			dispatch(setError("Cultivo fuera de fecha. Se requiere dictamen técnico de siembra."));
			return false;
		} else if (bloquearPorDictamenTecnico()) {
			dispatch(
				setError("El cultivo requiere dictamen técnico de siembra. Favor de comunicarse con SADER.")
			);
			return false;
		}

		// else if (
		// 	altaPermisos.nombreCultivo === "ALFALFA" &&
		// 	altaPermisos.cultivoAnterior !== "ALFALFA"
		// ) {
		// 	dispatch(
		// 		setError(
		// 			`El predio seleccionado no tenía alfalfa el ciclo pasado. Para establecer alfalfa en este predio, seleccione "ALFALFA NUEVA" en el campo cultivo.`
		// 		)
		// 	);
		// 	return false;
		// }

		// else if (
		// 	altaPermisos.nombreCultivo === "ALFALFA" &&
		// 	!altaPermisos.productoresAnteriores.find(
		// 		(productor) => productor.id === altaPermisos.idProductorSelected
		// 	)
		// ) {
		// 	dispatch(
		// 		setError(
		// 			`El productor no es el mismo productor del ciclo pasado en la cuenta seleccionada. Para establecer alfalfa en este predio, seleccione "ALFALFA NUEVA" en el campo cultivo.`
		// 		)
		// 	);
		// 	return false;
		// }
		else if (bloquearPorControlCPUS()) {
			dispatch(
				setError(
					`El productor no se encuentra registrado en el padrón de productores de "${altaPermisos.nombreCultivo}" o la superficie es mayor a la que tiene disponible en el padrón.`
				)
			);
			return false;
		} else if (
			autorizadosPorCultivo === undefined ||
			defineTipoPermiso(
				superficiePreviaCultivo,
				autorizadosPorCultivo.find((cultivo) => cultivo.clave === altaPermisos.claveCultivo)
			) === "Superficie no disponible"
		) {
			dispatch(setError("La superficie asignada para el cultivo no es suficiente."));
			return false;
		}

		dispatch(removeError());
		return true;
	};

	const getOnSubmitData = async () => {
		const data = {
			tipo: defineTipoPermiso(
				superficiePreviaCultivo,
				autorizadosPorCultivo.find((cultivo) => cultivo.clave === altaPermisos.claveCultivo)
			),
			ciclo,
			numeroPermiso: await defineNumeroPermiso(),
			fechaEmicion: moment(),
			fechaLimite: defineFechaLimite(
				altaPermisos.estado,
				altaPermisos.cultivos.find((cultivo) => cultivo.id === altaPermisos.idCultivoSelected)
			),
			vigencia: defineVigencia(subciclo),
			estadoPermiso: await defineEstadoPermiso(nombreCultivo),
			mensajeFijo: defineMesajeFijo(),
		};

		return data;
	};

	const defineMesajeFijo = () => {
		//Mensaje para transferencias
		if (usuarioSelected && usuarioSelected.folio) {
			return `TRANSFERENCIA FOLIO ${usuarioSelected.folio} EN EL LOTE ${loteDestino},  ${localidadDestino}`;
		}

		return false;
	};

	// TODO: Probar defineTipoPermiso (es necesario conciderar el acumulado de lo expedido para cada cultivo)
	const defineTipoPermiso = (superficiePreviaCultivo, autorizadosPorCultivo) => {
		const { gravedadNormalAsignada, gravedadExtraAsignada, pozoNormalAsignada, pozoExtraAsignada } =
			autorizadosPorCultivo;

		const {
			gravedadNormal: gravedadNormalPrevia,
			gravedadExtra: gravedadExtraPrevia,
			pozoNormal: pozoNormalPrevia,
			pozoExtra: pozoExtraPrevia,
			pozoParticularNormal: pozoParticularNormalPrevia,
			pozoParticularExtra: pozoParticularExtraPrevia,
		} = superficiePreviaCultivo;

		switch (altaPermisos.sistema) {
			case "Gravedad":
				if (
					tipo === "normal" &&
					roundToN(gravedadNormalAsignada - gravedadNormalPrevia, 4) >= supAutorizada
				)
					return "normal";
				if (
					tipo === "extra" &&
					roundToN(gravedadExtraAsignada - gravedadExtraPrevia, 4) >= supAutorizada
				)
					return "extra";
				return "Superficie no disponible";

			case "Pozo Federal":
				if (
					tipo === "normal" &&
					roundToN(pozoNormalAsignada - pozoNormalPrevia, 4) >= supAutorizada
				)
					return "normal";
				if (tipo === "extra" && roundToN(pozoExtraAsignada - pozoExtraPrevia, 4) >= supAutorizada)
					return "extra";
				return "Superficie no disponible";

			case "Pozo Particular":
				if (
					tipo === "normal" &&
					roundToN(pozoNormalAsignada - pozoParticularNormalPrevia, 4) >= supAutorizada
				)
					return "normal";
				if (
					tipo === "extra" &&
					roundToN(pozoExtraAsignada - pozoParticularExtraPrevia, 4) >= supAutorizada
				)
					return "extra";
				return "Superficie no disponible";

			default:
				return "Superficie no disponible";
		}
	};

	const defineNumeroPermiso = async () => {
		if (altaPermisos.sistema === "Pozo Particular") {
			const permiso = `${auth.modulo}-${fill((await loadContador(auth.modulo, ciclo)) + 1, 4)}`;
			return permiso;
		} else {
			const permiso = `MOD${auth.modulo}-${fill((await loadContador(auth.modulo, ciclo)) + 1, 4)}`;
			return permiso;
		}
	};

	const fill = (number, len) => "0".repeat(len - number.toString().length) + number.toString();

	const defineVigencia = (subciclo) => {
		// TODO: Determinar la vigencia segun subciclo y fecha de emicion
		let vigencia = null;
		if (subciclo) {
			switch (subciclo) {
				case "PRIMAVERA-VERANO":
					vigencia = moment("09/30/2022");
					break;

				case "OTOÑO-INVIERNO":
					vigencia = moment("09/30/2022");
					break;

				case "PERENNES":
					vigencia = moment("09/30/2022");
					break;

				case "PERENES":
					vigencia = moment("09/30/2022");
					break;

				default:
					vigencia = "";
					break;
			}
		}
		return vigencia;
	};

	const defineEstadoPermiso = async (/* cultivo */) => {
		// let estado = "";

		// if (cultivo === "ALGODONERO") estado = "pendiente";
		// else estado = "activo";

		return "activo";
	};

	const defineFechaLimite = (estado, cultivo) => {
		// if (cultivo === "TRIGO") return moment("12/31/2022");
		// else return moment("03/31/2023");

		if (estado === "Baja California") {
			if (cultivo.finBc) {
				const fechaSplit = cultivo.finBc.split("-");
				return moment(`${fechaSplit[1]}/${fechaSplit[2]}/${fechaSplit[0]}`);
			} else return "";
		}

		if (estado === "Sonora") {
			if (cultivo.finSonora) {
				const fechaSplit = cultivo.finBc.split("-");
				return moment(`${fechaSplit[1]}/${fechaSplit[2]}/${fechaSplit[0]}`);
			} else return "";
		}
	};

	// const setTransferComent = useCallback(
	// 	(folio, lote, tipolocalidad, localidad) => {
	// 		setValues((values) => ({
	// 			...values,
	// 			observaciones: `TRANSFERENCIA FOLIO ${folio} EN EL LOTE ${lote}, ${tipolocalidad.toUpperCase()} ${localidad}`,
	// 		}));
	// 	},
	// 	[setValues]
	// );

	// useEffect(() => {
	// 	if (idUsuarioSelected) {
	// 		const usuario = usuarios.find((usuario) => usuario.id === idUsuarioSelected);
	// 		if (usuario.folio) {
	// 			setTransferComent(
	// 				usuario.folio,
	// 				usuario.loteDestino,
	// 				usuario.tipolocalidadDestino,
	// 				usuario.localidadDestino
	// 			);
	// 		}
	// 	}
	// }, [idUsuarioSelected, usuarios, setTransferComent]);

	const setNormal = () => {
		dispatch(unsetUsuarioSelected());
		dispatch(setTipoNormal());
	};

	const setExtra = () => {
		dispatch(unsetUsuarioSelected());
		dispatch(setTipoExtra());
	};

	return (
		<>
			<div className="row m-3 d-flex justify-content-center">
				<h1>Alta de permiso unico de siembra</h1>
			</div>

			<div className="row m-3 d-flex justify-content-center align-items-center">
				<span className="mr-2">Tipo: </span>
				<div className="btn-group">
					<button
						className={`btn ${tipo === "normal" ? "btn-primary" : "btn-outline-primary"}`}
						onClick={setNormal}
					>
						Normal
					</button>
					<button
						className={`btn ${tipo === "extra" ? "btn-primary" : "btn-outline-primary"}`}
						onClick={setExtra}
					>
						Extra
					</button>
				</div>
			</div>

			{/* TODO: indicar cuando un campo es incorrecto directamente en los inputs */}
			{/* TODO: Checkbox para transferencia interna */}
			<form className="container pb-4">
				{msgError && <div className="auth__alert-error">{msgError}</div>}
				{idUsuarioSelected && <UsuarioSelected />}
				{idProductorSelected && <ProductorSelected />}
				{idCultivoSelected && autorizadosPorCultivo && superficiePreviaCultivo && (
					<CultivoSelected />
				)}

				<div className="row text-warning">* Campos obligatorios</div>

				<div className="row">
					<UsuarioInput />
					<ProductorInput />
				</div>

				<div className="row">
					{usuarioSelected && usuarioSelected.folio && (
						<>
							<div className="col-sm-6">
								<div className="form-group d-flex align-items-baseline row p-3">
									<label className="col-sm-3">
										<span className="text-warning">* </span>
										Localidad:
									</label>
									<div className="flex-grow-1 ">
										<input
											tabIndex="7"
											type="text"
											className="form-control"
											placeholder="Localidad donde se aplica la trasferencia"
											name="localidadDestino"
											value={localidadDestino}
											autoComplete="off"
											onChange={handleInputChange}
										/>
									</div>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="form-group d-flex align-items-baseline row p-3">
									<label className="col-sm-3">
										<span className="text-warning">* </span>
										Lote:
									</label>
									<div className="flex-grow-1 ">
										<input
											tabIndex="7"
											type="text"
											className="form-control"
											placeholder="Lote donde se aplica la trasferencia"
											name="loteDestino"
											value={loteDestino}
											autoComplete="off"
											onChange={handleInputChange}
										/>
									</div>
								</div>
							</div>
						</>
					)}
				</div>

				<div className="row">
					<CultivoInput altaFormValues={formValues} setAltaFormValues={setValues} />
					<VariedadInput variedad={variedad} handleInputChange={handleInputChange} />
				</div>

				<div className="row">
					<SuperficieInput
						formValues={formValues}
						handleInputChange={handleInputChange}
						setValues={setValues}
					/>

					<div className="col-sm-6">
						<div className="form-group d-flex align-items-baseline row p-3">
							<label className="col-sm-3">
								<span className="text-warning">* </span>
								Fuente de credito:
							</label>
							<div className="flex-grow-1 ">
								<input
									tabIndex="7"
									type="text"
									className="form-control"
									placeholder="fuente de credito"
									name="fuenteCredito"
									value={fuenteCredito}
									autoComplete="off"
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<CultivoAnteriorInput />

					<div className="col-sm-6">
						<div className="form-group d-flex align-items-baseline row p-3">
							<label className="col-sm-3">Transferencia interna:</label>
							<div className="flex-grow-1 ">
								<input
									tabIndex="8"
									type="text"
									className="form-control"
									placeholder="Cuenta destino"
									name="transferencia"
									value={transferencia}
									autoComplete="off"
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-6">
						<div className="form-group row p-3">
							<label className="mr-3">
								<span className="text-warning">* </span>
							</label>

							<div className="form-group form-check">
								<input
									tabIndex="9"
									type="checkbox"
									className="form-check-input"
									id="cuotaSanidad"
									name="cuotaSanidad"
									value={cuotaSanidad}
									onChange={handleInputChange}
									checked={cuotaSanidad}
								/>
								<label className="form-check-label" htmlFor="cuotaSanidad">
									Cobrar cuota de sanidad vegetal
								</label>
							</div>
						</div>
					</div>
				</div>

				<div className="form-group">
					<textarea
						tabIndex="10"
						type="text"
						className="form-control"
						placeholder="Observaciones"
						rows="5"
						name="observaciones"
						value={observaciones}
						onChange={handleInputChange}
					></textarea>
					<small id="emailHelp" className="form-text text-muted">
						Información adicional
					</small>
				</div>

				{msgError && <div className="auth__alert-error">{msgError}</div>}
				<div className="row d-flex justify-content-center pt-5 d-print-none">
					<button
						tabIndex="11"
						type="button"
						className="btn btn-outline-primary"
						onClick={onSendForm}
					>
						<i className="far fa-file"></i>
						<span> Revisar</span>
					</button>
				</div>
			</form>
			<CultivoModal />
			<CultivoAnteriorModal />
			<UsuarioModal />
			<ProductorModal />
			<NuevoProductorModal />
			<PrintPermisoModal
				data={permisoData}
				isNew={true}
				formValues={formValues}
				setValues={setValues}
			/>
		</>
	);
};
