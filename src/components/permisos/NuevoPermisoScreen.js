import React from "react";
import { useSelector } from "react-redux";
import { CultivoModal } from "../modals/CultivoModal";
import { UsuarioModal } from "../modals/UsuarioModal";
import { ProductorModal } from "../modals/ProductorModal";
import { NuevoProductorModal } from "../modals/NuevoProductorModal";
import { CultivoInput } from "./inputsNuevosPermisos/CultivoInput";
import { UsuarioInput } from "./inputsNuevosPermisos/UsuarioInput";
import { ProductorInput } from "./inputsNuevosPermisos/ProductorInput";
import { UsuarioSelected } from "./inputsNuevosPermisos/UsuarioSelected";
import { ProductorSelected } from "./inputsNuevosPermisos/ProductorSelected";

export const NuevoPermisoScreen = () => {
	const { idUsuarioSelected, idProductorSelected } = useSelector((state) => state.altaPermisos);
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
									autoComplete="off"
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
									name="superficie"
									autoComplete="off"
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
									placeholder="fuente-credito"
									name="fuente-credito"
									autoComplete="off"
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
									autoComplete="off"
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
									autoComplete="off"
								/>
							</div>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-6">
						<div className="form-group d-flex align-items-baseline row p-3">
							<label className="col-sm-3">Tipo:</label>
							<br />
							<div className="row">
								<div className="px-4">
									<input type="radio" id="normal" name="tipo" value="normal" />
									<span> </span>
									<label htmlFor="normal"> Normal</label>
								</div>
								<div className="px-4">
									<input type="radio" id="superficie-extra" name="tipo" value="superficie-extra" />
									<span> </span>
									<label htmlFor="superficie-extra"> Superficie extra</label>
								</div>
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
						name="notas"
					></textarea>
					<small id="emailHelp" className="form-text text-muted">
						Información adicional
					</small>
				</div>

				<button type="button" className="btn btn-outline-primary btn-block">
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
