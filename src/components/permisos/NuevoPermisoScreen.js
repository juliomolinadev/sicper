import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openCultivosModal, startloadCultivos } from "../../actions/altaPermisos";
import { useForm } from "../../hooks/useForm";
import { CultivoModal } from "../modals/CultivoModal";

export const NuevoPermisoScreen = () => {
	const dispatch = useDispatch();

	const handleOpenCultivosModal = () => {
		handleLoadCultivos();
		dispatch(openCultivosModal());
	};

	const handleLoadCultivos = () => {
		dispatch(startloadCultivos(cultivo.toUpperCase()));
	};

	const [formValues, handleInputChange] = useForm({
		cultivo: null
	});

	const { cultivo } = formValues;

	const { cultivoSelected } = useSelector((state) => state.altaPermisos);

	return (
		<>
			<div className="row m-3 d-flex justify-content-center">
				<h1>Alta de permiso unico de siembra</h1>
			</div>
			<form className="container pb-4">
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Usuario:</label>
							<input
								type="text"
								className="form-control"
								placeholder="Usuario"
								name="usuario"
								autoComplete="off"
							/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Productor:</label>
							<input
								type="text"
								className="form-control"
								placeholder="Productor"
								name="productor"
								autoComplete="off"
							/>
						</div>
					</div>
				</div>

				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<div className="d-flex justify-content-between">
								<label>Cultivo: </label>
								<label>{cultivoSelected} </label>
								{cultivoSelected ? <div className="fas fa-check text-success"></div> : <></>}
							</div>
							<div className="d-flex flex-row">
								<input
									type="text"
									className="form-control"
									placeholder="cultivo"
									name="cultivo"
									autoComplete="off"
									value={cultivo}
									onChange={handleInputChange}
								/>
								<button
									className=" btn btn-primary btn-sm d-sm-block"
									type="button"
									onClick={handleOpenCultivosModal}
								>
									<i className="fas fa-search"></i>
								</button>
							</div>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Variedad:</label>
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
				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Superficie:</label>
							<input
								type="text"
								className="form-control"
								placeholder="superficie"
								name="superficie"
								autoComplete="off"
							/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Fuente de credito:</label>
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

				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Latitud:</label>
							<input
								type="text"
								className="form-control"
								placeholder="latitud"
								name="latitud"
								autoComplete="off"
							/>
						</div>
					</div>
					<div className="col-sm-6">
						<div className="form-group">
							<label>Longitud:</label>
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

				<div className="row">
					<div className="col-sm-6">
						<div className="form-group">
							<label>Tipo:</label>
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
					<div className="col-sm-6">
						<div className="form-group">
							<label>Sistema:</label>
							<br />
							<div className="row">
								<div className="px-4">
									<input type="checkbox" id="gravedad" name="sistema" value="gravedad" />
									<span> </span>
									<label htmlFor="gravedad">Gravedad</label>
								</div>
								<div className="px-4">
									<input
										type="checkbox"
										id="poso-particular"
										name="sistema"
										value="poso-particular"
									/>
									<span> </span>
									<label htmlFor="poso-particular"> Poso particular</label>
								</div>
								<div className="px-4">
									<input type="checkbox" id="poso-federal" name="sistema" value="poso-federal" />
									<span> </span>
									<label htmlFor="poso-federal"> Poso federal</label>
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

				<button type="submit" className="btn btn-outline-primary btn-block">
					<i className="far fa-save"></i>
					<span> Guardar</span>
				</button>
			</form>
			<CultivoModal />
		</>
	);
};

// Ctrl + Shift + W R   : Emmet wrap.
// Alt + ↑ / ↓          : Mueve el contenido de una linea o seleccion.
// Shift + Tab          : Quita la indentacion de un bloque seleccionado.
// Alt + Shift + ↑ / ↓  : Clona la linea actual o bloque seleccionado abajo o arriba.
// Ctrl + Shift + L     : Selecciona todas las ocurrencias de la seleccion.
// Ctrl + Shift + K     : Borra la linea actual.
// Ctrl + Shift + ↑ / ↓ : Crea multicursores continuos.
// Ctrl + Alt + U       : Combierte seleccion en mayusculas.
// Ctrl + D             : Selecciona la siguiente ocurencia con multicursor.

// Ctrl + P             : [Input] Lista de busqueda para los archivos del proyecto
// Ctrl + Shift + P     : [Input + >] Lista de busqueda para comandos.
// Ctrl + Shift + O     : [Input + @] Lista de busqueda para las definiciones de elementos (: ordena).
// Ctrl + G             : [Input + :] Buscar una linea en especifico.

// Ctrl + Alt + clk der : Abre tab con la definicion del elemento en cursor, lo crea si no existe.
// Ctrl + Shift + F12   : Abre una ventana que muestra la definicion del elemento en cursor.
// F2                   : Refactorizar, rename.

// Ctrl + K Z           : Modo zen.
// Ctrl + `             : Abre la terminal.
// Ctrl + K Ctrl + S    : Configuracion de shortcuts.
// Ctrl + Shift + V     : Abre archivo en markdown para previsualizar.
// Shift + Alt + S      : Guarda todos los archivos.
// Ctrl + space         : Recupera el autocompletado.

// Ctrl + /             : Comenta la linea donde se encuentre el cursor o el bloque seleccionado.
// Ctrl + Shift + A     : Comenta solo el fragmento seleccionado.
