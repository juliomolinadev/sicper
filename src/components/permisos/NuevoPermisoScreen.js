import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useForm } from "../../hooks/useForm";
import { CultivoModal } from "../modals/CultivoModal";
import { UsuarioModal } from "../modals/UsuarioModal";
import { ProductorModal } from "../modals/ProductorModal";
import { NuevoProductorModal } from "../modals/NuevoProductorModal";
import { CultivoInput } from "./inputsNuevosPermisos/CultivoInput";
import { UsuarioInput } from "./inputsNuevosPermisos/UsuarioInput";
import { ProductorInput } from "./inputsNuevosPermisos/ProductorInput";
import { UsuarioSelected } from "./inputsNuevosPermisos/UsuarioSelected";
import { ProductorSelected } from "./inputsNuevosPermisos/ProductorSelected";
import { setFormValues, setOnSubmitData } from "../../actions/altaPermisos";

export const NuevoPermisoScreen = () => {
	const { idUsuarioSelected, idProductorSelected, subciclo } = useSelector(
		(state) => state.altaPermisos
	);

	const [formValues, handleInputChange] = useForm({
		variedad: "",
		supAutorizada: 0,
		fuenteCredito: "",
		latitud: "",
		longitud: "",
		observaciones: ""
	});

	const { variedad, supAutorizada, fuenteCredito, latitud, longitud, observaciones } = formValues;

	const dispatch = useDispatch();

	const onSendForm = (e) => {
		if (isFormValid()) {
			e.preventDefault();
			dispatch(setFormValues(formValues));
			dispatch(setOnSubmitData(getOnSubmitData()));
		}
	};

	const isFormValid = () => {
		// TODO: Validar formulario de nuevos permisos
		return true;
	};

	const getOnSubmitData = () => {
		const data = {
			tipo: defineTipoPermiso(),
			ciclo: defineCiclo(),
			numeroPermiso: defineNumeroPermiso(),
			fechaEmicion: moment().format("DD/MM/YYYY"),
			fechaLimite: moment().add(10, "days").format("DD/MM/YYYY"),
			vigencia: defineVigencia(subciclo)
			// supDisponible: defineSupDisponible(),
			// cuotas: defineCuotas(),
		};

		return data;
	};

	const defineTipoPermiso = () => {
		// TODO: Determinar si el permiso es normal o extra segun tabla de superficie autorizada por cultivo
		const tipo = "Normal";
		return tipo;
	};

	const defineCiclo = () => {
		// TODO: Determinar el ciclo segun la fecha
		const ciclo = "2020-2021";
		return ciclo;
	};

	const defineNumeroPermiso = () => {
		// TODO: Determinar el numero de permiso segun contador
		const permiso = "M19-000";
		return permiso;
	};

	const defineVigencia = (subciclo) => {
		// TODO: Determinar la vigencia segun subciclo y fecha de emicion
		let vigencia = null;
		if (subciclo) {
			switch (subciclo) {
				case "PRIMAVERA-VERANO":
					vigencia = moment("09/30/2021").format("DD/MM/YYYY");
					break;

				case "OTOÑO-INVIERNO":
					vigencia = moment("05/31/2021").format("DD/MM/YYYY");
					break;

				case "PERENNES":
					vigencia = moment("09/30/2021").format("DD/MM/YYYY");
					break;

				case "PERENES":
					vigencia = moment("09/30/2021").format("DD/MM/YYYY");
					break;

				default:
					vigencia = "";
					break;
			}
		}
		return vigencia;
	};

	return (
		<>
			<div className="row m-3 d-flex justify-content-center">
				<h1>Alta de permiso unico de siembra</h1>
			</div>

			<form className="container pb-4">
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
									type="text"
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
							<label className="col-sm-3">Latitud:</label>
							<div className="flex-grow-1 ">
								<input
									type="text"
									className="form-control"
									placeholder="latitud"
									name="latitud"
									value={latitud}
									autoComplete="off"
									onChange={handleInputChange}
								/>
							</div>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group d-flex align-items-baseline row p-3">
							<label className="col-sm-3">Longitud:</label>
							<div className="flex-grow-1 ">
								<input
									type="text"
									className="form-control"
									placeholder="longitud"
									name="longitud"
									value={longitud}
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

				<button type="button" className="btn btn-outline-primary btn-block" onClick={onSendForm}>
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>
			</form>
			<CultivoModal />
			<UsuarioModal />
			<ProductorModal />
			<NuevoProductorModal />
		</>
	);
};
