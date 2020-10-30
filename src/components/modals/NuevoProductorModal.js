import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeNuevoProductorModal } from "../../actions/nuevoProductor";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		height: "550px"
	}
};

Modal.setAppElement("#root");

export const NuevoProductorModal = () => {
	const dispatch = useDispatch();

	const { openNuevoProductorModal } = useSelector((state) => state.altaPermisos);

	const closeModal = () => {
		dispatch(closeNuevoProductorModal());
	};

	return (
		<Modal
			isOpen={openNuevoProductorModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<div className="row m-3 d-flex justify-content-center">
				<h1>Registro de nuevo productor</h1>
			</div>

			<form className="container pb-4">
				<div className="row p-2">
					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="Apellido Paterno"
							name="apPaterno"
							autoComplete="off"
						/>
					</div>

					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="direccion"
							name="Direccion"
							autoComplete="off"
						/>
					</div>
				</div>

				<div className="row p-2">
					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="Apellido Materno"
							name="apMaterno"
							autoComplete="off"
						/>
					</div>

					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="Estado"
							name="estado"
							autoComplete="off"
						/>
					</div>
				</div>

				<div className="row p-2">
					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="Nombre"
							name="nombre"
							autoComplete="off"
						/>
					</div>

					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="Municipio"
							name="municipio"
							autoComplete="off"
						/>
					</div>
				</div>

				<div className="row p-2">
					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="RFC"
							name="rfc"
							autoComplete="off"
						/>
					</div>

					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="CP"
							name="cp"
							autoComplete="off"
						/>
					</div>
				</div>

				<div className="row p-2">
					<div className="col-sm-6 d-flex align-items-baseline pt-2">
						<div className="px-4">
							<input type="radio" id="masculino" name="genero" value="MASCULINO" />
							<span> </span>
							<label htmlFor="masculino"> Masculino</label>
						</div>
						<div className="px-4">
							<input type="radio" id="femenino" name="genero" value="FEMENINO" />
							<span> </span>
							<label htmlFor="femenino"> Femenino</label>
						</div>
					</div>

					<div className="col-sm-6">
						<input
							type="text"
							className="form-control"
							placeholder="Telefono"
							name="telefono"
							autoComplete="off"
						/>
					</div>
				</div>

				<div className="row d-flex justify-content-center pt-5">
					<button type="button" className="btn btn-outline-primary">
						<i className="far fa-save"></i>
						<span> Guardar</span>
					</button>
				</div>
			</form>
		</Modal>
	);
};
