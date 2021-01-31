import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { useForm } from "../../hooks/useForm";
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
import { setFormValues, setOnSubmitData, openPrintPermisoModal } from "../../actions/altaPermisos";
import { loadContador } from "../../helpers/loadContador";
import { removeError, setError } from "../../actions/ui";
import { startLoadAutorizados } from "../../actions/autorizadosScreen";

export const NuevoPermisoScreen = () => {
	const { idUsuarioSelected, idProductorSelected, subciclo, nombreCultivo } = useSelector(
		(state) => state.altaPermisos
	);
	const altaPermisos = useSelector((state) => state.altaPermisos);
	const auth = useSelector((state) => state.auth);
	const { msgError } = useSelector((state) => state.ui);
	const { autorizados } = useSelector((state) => state.autorizadosScreen);

	const [formValues, handleInputChange] = useForm({
		variedad: "",
		supAutorizada: 0,
		fuenteCredito: "",
		latitud: "",
		longitud: "",
		observaciones: "",
		cultivoAnterior: "",
		transferencia: ""
	});

	const {
		variedad,
		supAutorizada,
		fuenteCredito,
		// latitud,
		// longitud,
		observaciones,
		cultivoAnterior,
		transferencia
	} = formValues;

	const permisoData = {
		...formValues,
		...altaPermisos,
		...auth
	};

	const dispatch = useDispatch();

	if (autorizados.length === 0) {
		dispatch(startLoadAutorizados(auth.claveEntidad));
	}

	const handleOpenPrintPermisoModal = () => {
		dispatch(openPrintPermisoModal());
	};

	const onSendForm = async (e) => {
		if (isFormValid()) {
			e.preventDefault();
			dispatch(setFormValues(formValues));
			dispatch(setOnSubmitData(await getOnSubmitData()));
			handleOpenPrintPermisoModal();
		}
	};

	const isFormValid = () => {
		// TODO: Validar formulario de nuevos permisos
		if (!altaPermisos.usuario) {
			dispatch(setError("El campo usuario es obligatorio."));
			return false;
		} else if (!altaPermisos.nombreProductor) {
			dispatch(setError("El campo productor es obligatorio."));
			return false;
		} else if (!altaPermisos.nombreCultivo) {
			dispatch(setError("El campo cultivo es obligatorio."));
			return false;
		} else if (supAutorizada <= 0) {
			dispatch(setError("Ingrese la superficie que será autorizada en este permiso."));
			return false;
		} else if (altaPermisos.supDerecho - altaPermisos.supPrevia < supAutorizada) {
			dispatch(
				setError("La superficie excede la superficie disponible de la cuenta seleccionada.")
			);
			return false;
		} else if (!fuenteCredito) {
			dispatch(setError("Especifique la fuente de crédito."));
			return false;
		} else if (!cultivoAnterior) {
			dispatch(setError("Especifique el cultivo anterior."));
			return false;
		} else if (defineTipoPermiso() === "Superficie no disponible") {
			dispatch(setError("Superficie no disponible."));
			return false;
		}

		dispatch(removeError());
		return true;
	};

	const getOnSubmitData = async () => {
		const data = {
			tipo: defineTipoPermiso(),
			ciclo: defineCiclo(),
			numeroPermiso: await defineNumeroPermiso(),
			fechaEmicion: moment(),
			// TODO: Verificar la fecha limite de siembra
			fechaLimite: moment().add(10, "days"),
			vigencia: defineVigencia(subciclo),
			estadoPermiso: await defineEstadoPermiso(nombreCultivo)
		};

		return data;
	};

	const defineTipoPermiso = () => {
		let tipo = "";
		autorizados.forEach((cultivo) => {
			if (
				cultivo.cultivo === altaPermisos.nombreCultivo &&
				cultivo.clave === altaPermisos.claveCultivo
			) {
				if (altaPermisos.sistema === "Gravedad") {
					if (cultivo.gravedadNormalAsignada >= supAutorizada) tipo = "normal";
					else if (cultivo.gravedadExtraAsignada >= supAutorizada) tipo = "extra";
					else tipo = "Superficie no disponible";
				} else if (altaPermisos.sistema === "Pozo Federal") {
					if (cultivo.pozoNormalAsignada >= supAutorizada) tipo = "normal";
					else if (cultivo.pozoExtraAsignada >= supAutorizada) tipo = "extra";
					else tipo = "Superficie no disponible";
				}
			}
		});

		return tipo;
	};

	const defineCiclo = () => {
		// TODO: Determinar el ciclo segun la fecha
		const ciclo = "2020-2021";
		return ciclo;
	};

	const defineNumeroPermiso = async () => {
		const permiso = `MOD${auth.claveEntidad}-${fill(
			(await loadContador(auth.claveEntidad)) + 1,
			3
		)}`;
		return permiso;
	};

	const fill = (number, len) => "0".repeat(len - number.toString().length) + number.toString();

	const defineVigencia = (subciclo) => {
		// TODO: Determinar la vigencia segun subciclo y fecha de emicion
		let vigencia = null;
		if (subciclo) {
			switch (subciclo) {
				case "PRIMAVERA-VERANO":
					vigencia = moment("09/30/2021");
					break;

				case "OTOÑO-INVIERNO":
					vigencia = moment("05/31/2021");
					break;

				case "PERENNES":
					vigencia = moment("09/30/2021");
					break;

				case "PERENES":
					vigencia = moment("09/30/2021");
					break;

				default:
					vigencia = "";
					break;
			}
		}
		return vigencia;
	};

	const defineEstadoPermiso = async (cultivo) => {
		let estado = "";

		if (cultivo === "ALGODONERO") estado = "pendiente";
		else estado = "activo";

		return estado;
	};

	return (
		<>
			<div className="row m-3 d-flex justify-content-center">
				<h1>Alta de permiso unico de siembra</h1>
			</div>

			{/* TODO: indicar cuando un campo es incorrecto directamente en los inputs */}
			{/* TODO: Cambiar el flujo de los tab para que no se seleccionen las lupas */}
			{/* TODO: Checkbox para transferencia interna */}
			<form className="container pb-4">
				{/* TODO: Poner el mensaje de error en un lugar mas visible */}
				{msgError && <div className="auth__alert-error">{msgError}</div>}
				{idUsuarioSelected ? <UsuarioSelected /> : <></>}
				{idProductorSelected ? <ProductorSelected /> : <></>}

				<div className="row">
					<UsuarioInput />
					<ProductorInput />
				</div>

				<div className="row">
					<CultivoInput />

					<div className="col-sm-6">
						<div className="form-group d-flex align-items-baseline row p-3">
							<label className="col-sm-3">Variedad:</label>
							<div className="flex-grow-1 ">
								<input
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
				</div>
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group d-flex align-items-baseline row p-3">
							<label className="col-sm-3">Superficie:</label>
							<div className="flex-grow-1 ">
								<input
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
					</div>
					<div className="col-sm-6">
						<div className="form-group d-flex align-items-baseline row p-3">
							<label className="col-sm-3">Fuente de credito:</label>
							<div className="flex-grow-1 ">
								<input
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
					<div className="col-sm-6">
						<div className="form-group d-flex align-items-baseline row p-3">
							<label className="col-sm-3">Cultivo anterior:</label>
							<div className="flex-grow-1 ">
								<input
									type="text"
									className="form-control"
									placeholder="Cultivo anterior"
									name="cultivoAnterior"
									value={cultivoAnterior}
									autoComplete="off"
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>

					<div className="col-sm-6">
						<div className="form-group d-flex align-items-baseline row p-3">
							<label className="col-sm-3">Transferencia interna:</label>
							<div className="flex-grow-1 ">
								<input
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

				<div className="form-group">
					<textarea
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

				<div
					className="row d-flex justify-content-center pt-5"
					// onClick={handleOpenPrintPermisoModal}
				>
					<button type="button" className="btn btn-outline-primary" onClick={onSendForm}>
						<i className="far fa-save"></i>
						<span> Guardar</span>
					</button>
				</div>
			</form>
			<CultivoModal />
			<UsuarioModal />
			<ProductorModal />
			<NuevoProductorModal />
			<PrintPermisoModal data={permisoData} isNew={true} />
		</>
	);
};
