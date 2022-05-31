import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
	closeGuiaForm,
	openGuiaPrint,
	setDataGuia,
	startSetFolioGuia
} from "../../actions/permisosScreen";
import { removeError, setError } from "../../actions/ui";
import { useFormToUpper } from "../../hooks/UseFormToUpper";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		height: "450px",
		overflow: "auto"
	}
};

// Modal.setAppElement("#root");

export const GuiaFormModal = () => {
	const dispatch = useDispatch();

	const { isGuiaFormModalOpen, permisos, permisoSelected } = useSelector(
		(state) => state.permisosScreen
	);
	const permiso = permisos.find((permiso) => permiso.id === permisoSelected);
	const { msgError } = useSelector((state) => state.ui);
	const { modulo, variablesGlobales } = useSelector((state) => state.auth);
	const { cicloActual } = variablesGlobales;

	const closeModal = () => {
		dispatch(closeGuiaForm());
	};

	const [formValues, handleInputChange] = useFormToUpper();
	const { empresaDestino = "", ubicacionDestino = "", rendimiento = 0, costo = 0 } = formValues;

	const handleRegister = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			dispatch(startSetFolioGuia(cicloActual, modulo));
			dispatch(
				setDataGuia({
					...formValues,
					guardado: false,
					permiso: permiso.id,
					productor: permiso.nombreProductor,
					modulo: permiso.modulo,
					nombre: permiso.usuario,
					lote: permiso.lote,
					superficie: permiso.supAutorizada,
					tipoLocalidad: permiso.tipoLocalidad,
					localidad: permiso.localidad,
					fecha: new Date(),
					cuenta: permiso.cuenta,
					trasladoNoTolvas: "",
					trasladoNoToneladas: "",
					trasladoNoModulos: "",
					trasladoToneladas: "",
					trasladoTonTotales: "",
					recibidoNoTolvas: "",
					recibidoNoToneladas: "",
					recibidoNoModulos: "",
					recibidoToneladas: "",
					recibidoTonTotales: ""
				})
			);
			dispatch(openGuiaPrint());
			dispatch(closeGuiaForm());
		}
	};

	const isFormValid = () => {
		if (empresaDestino.trim().length === 0) {
			dispatch(setError("Se requiere nombre de la empresa destino"));
			return false;
		} else if (ubicacionDestino.trim().length === 0) {
			dispatch(setError("Se requiere la ubicación del destino"));
			return false;
		} else if (rendimiento <= 0) {
			dispatch(setError("Se requiere el rendimiento por hectarea"));
			return false;
		} else if (costo <= 0) {
			dispatch(setError("Se requiere el costo por hectarea"));
			return false;
		}
		dispatch(removeError());

		return true;
	};

	return (
		<Modal
			isOpen={isGuiaFormModalOpen}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<div className="row m-3 d-flex justify-content-center">
				<h1>Registro de Guía</h1>
			</div>

			<div className="row m-3 d-flex justify-content-center">* Campos obligatorios</div>

			<form className="container pb-4" autoComplete="waa" onSubmit={handleRegister}>
				{msgError && <div className="auth__alert-error ">{msgError}</div>}

				<div className="row p-2">
					<div className="col-sm-6">
						* Empresa Destino:
						<input
							type="text"
							className="form-control"
							name="empresaDestino"
							value={empresaDestino}
							autoComplete="off"
							onChange={handleInputChange}
						/>
					</div>

					<div className="col-sm-6">
						* Ubicación:
						<input
							type="text"
							className="form-control"
							name="ubicacionDestino"
							value={ubicacionDestino}
							autoComplete="waa"
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="row p-2">
					<div className="col-sm-6">
						* Rendimiento (TON/HA):
						<input
							type="number"
							className="form-control"
							name="rendimiento"
							value={rendimiento}
							autoComplete="off"
							onChange={handleInputChange}
						/>
					</div>

					<div className="col-sm-6">
						* Costo ($/HA):
						<input
							type="number"
							className="form-control"
							name="costo"
							value={costo}
							autoComplete="waa"
							onChange={handleInputChange}
						/>
					</div>
				</div>

				<div className="row d-flex justify-content-center pt-3">
					<button type="submit" className="btn btn-outline-primary">
						Revisar
					</button>
				</div>
			</form>
		</Modal>
	);
};
