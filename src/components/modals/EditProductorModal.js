import React from "react";
import Modal from "react-modal";
import { updateProducer } from "../../helpers/DB/updateProducer";
import { useFormToUpper } from "../../hooks/UseFormToUpper";

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		height: "550px",
		overflow: "auto"
	}
};

Modal.setAppElement("#root");

export const EditProductorModal = ({
	openEditModal,
	productor,
	msgError,
	dispatch,
	reload,
	resetProductor
}) => {
	const [formValues, handleInputChange] = useFormToUpper(productor);
	const idAnterior = productor.id;
	const tipoPersonaAnterior = productor.genero === "MORAL" ? "MORAL" : "FISICA";
	const curpAnterior = productor.curp;
	const nombreAnterior = `${productor.apPaterno} ${productor.apMaterno} ${productor.nombre}`;
	const rfcAnterior = productor.rfc;
	const uid = productor.uid;
	const fechaRegistro = productor.fechaRegistro;

	const {
		curp,
		apPaterno,
		apMaterno,
		nombre,
		rfc,
		direccion,
		municipio,
		estado,
		cp,
		telefono,
		genero
	} = formValues;

	// console.log(formValues);

	const closeModal = () => {
		dispatch({
			type: "closeModal"
		});
	};

	const handleUpdate = async (e) => {
		e.preventDefault();

		const productor = {
			id: genero === "MORAL" ? `${curp}-PM` : curp,
			curp,
			apPaterno,
			apMaterno,
			nombre,
			rfc,
			direccion,
			estado,
			municipio,
			cp,
			telefono: telefono.replace(/ /g, ""),
			genero,
			uid,
			fechaRegistro
		};

		if (isFormValid()) {
			const isSave = await updateProducer(
				productor,
				idAnterior,
				tipoPersonaAnterior,
				curpAnterior,
				nombreAnterior,
				rfcAnterior
			);

			if (isSave) {
				closeModal();
				reload();
				resetProductor({ ...productor, id: genero === "MORAL" ? `${curp}-PM` : curp });
			}
		}
	};

	const isFormValid = () => {
		if (apPaterno.trim().length === 0) {
			dispatch({ type: "setError", payload: "Se requiere apellido paterno" });
			return false;
		} else if (direccion.trim().length === 0) {
			dispatch({ type: "setError", payload: "Se requiere direccion" });
			return false;
		} else if (apMaterno.trim().length === 0) {
			dispatch({ type: "setError", payload: "Se requiere apellido materno" });
			return false;
		} else if (estado.trim().length === 0) {
			dispatch({ type: "setError", payload: "Se requiere estado" });
			return false;
		} else if (nombre.trim().length === 0) {
			dispatch({ type: "setError", payload: "Se requiere nombre" });
			return false;
		} else if (municipio.trim().length === 0) {
			dispatch({ type: "setError", payload: "Se requiere municipio" });
			return false;
		} else if (curp.trim().length < 18 || curp.trim().length > 18) {
			dispatch({ type: "setError", payload: "CURP no valido" });
			return false;
		} else if (genero.length === 0) {
			dispatch({ type: "setError", payload: "Se requiere genero" });
			return false;
		} else if (genero === "MORAL" && rfc.trim().length !== 12) {
			dispatch({ type: "setError", payload: "RFC no valido" });
			return false;
		} else if (genero !== "MORAL" && rfc.trim().length !== 13) {
			dispatch({ type: "setError", payload: "RFC no valido" });
			return false;
		} else if (cp.trim().length < 5) {
			dispatch({ type: "setError", payload: "Codigo postal no valido" });
			return false;
		} else if (telefono.replace(/ /g, "").length < 10) {
			dispatch({ type: "setError", payload: "Telefono no valido" });
			return false;
		}
		dispatch({ type: "removeError" });

		return true;
	};

	return (
		<Modal
			isOpen={openEditModal}
			onRequestClose={closeModal}
			style={customStyles}
			closeTimeoutMS={200}
			className="modal"
			overlayClassName="modal-fondo"
		>
			<div className="row m-3 d-flex justify-content-center">
				<h1>Registro de nuevo productor</h1>
			</div>

			<div className="row m-3 d-flex justify-content-center">* Campos obligatorios</div>

			<form className="container pb-4" autoComplete="waa" onSubmit={handleUpdate}>
				{msgError && <div className="auth__alert-error">{msgError}</div>}
				<div className="row p-2">
					<div className="col-sm-6">
						<div className="mt-2">
							<label htmlFor="curp">* CURP:</label>
							<input
								id="curp"
								type="text"
								className="form-control"
								placeholder="* CURP"
								name="curp"
								value={curp}
								autoComplete="waa"
								onChange={handleInputChange}
							/>
						</div>

						<div className="mt-2">
							<label htmlFor="apPaterno">* Paterno:</label>
							<input
								type="text"
								className="form-control"
								placeholder="* Apellido Paterno"
								id="apPaterno"
								name="apPaterno"
								value={apPaterno}
								autoComplete="off"
								onChange={handleInputChange}
							/>
						</div>

						<div className="mt-2">
							<label htmlFor="apMaterno">* Materno:</label>
							<input
								type="text"
								className="form-control"
								placeholder="* Apellido Materno"
								id="apMaterno"
								name="apMaterno"
								value={apMaterno}
								autoComplete="waa"
								onChange={handleInputChange}
							/>
						</div>

						<div className="mt-2">
							<label htmlFor="nombre">* Nombre:</label>
							<input
								type="text"
								className="form-control"
								placeholder="* Nombre"
								id="nombre"
								name="nombre"
								value={nombre}
								autoComplete="off"
								onChange={handleInputChange}
							/>
						</div>

						<div className="mt-2">
							<label htmlFor="rfc">* RFC:</label>
							<input
								type="text"
								className="form-control"
								placeholder="* RFC"
								id="rfc"
								name="rfc"
								value={rfc}
								autoComplete="off"
								onChange={handleInputChange}
							/>
						</div>
					</div>

					<div className="col-sm-6">
						<div className="mt-2">
							<label htmlFor="direccion">* Dirección:</label>
							<input
								type="text"
								className="form-control"
								placeholder="* Direccion"
								id="direccion"
								name="direccion"
								value={direccion}
								autoComplete="waa"
								onChange={handleInputChange}
							/>
						</div>

						<div className="mt-2">
							<label htmlFor="estado">* Estado:</label>
							<input
								type="text"
								className="form-control"
								placeholder="* Estado"
								id="estado"
								name="estado"
								value={estado}
								autoComplete="waa"
								onChange={handleInputChange}
							/>
						</div>

						<div className="mt-2">
							<label htmlFor="municipio">* Municipio:</label>
							<input
								type="text"
								className="form-control"
								placeholder="* Municipio"
								id="municipio"
								name="municipio"
								value={municipio}
								autoComplete="waa"
								onChange={handleInputChange}
							/>
						</div>

						<div className="mt-2">
							<label htmlFor="cp">* C.P:</label>
							<input
								type="text"
								className="form-control"
								placeholder="* CP"
								id="cp"
								name="cp"
								value={cp}
								autoComplete="waa"
								onChange={handleInputChange}
							/>
						</div>

						<div className="mt-2">
							<label htmlFor="telefono">* Teléfono:</label>
							<input
								type="text"
								className="form-control"
								placeholder="* Telefono"
								id="telefono"
								name="telefono"
								value={telefono}
								autoComplete="off"
								onChange={handleInputChange}
							/>
						</div>
					</div>
				</div>

				<div className="row p-2">
					<div className="col-sm-12 d-flex align-items-baseline pt-2">
						<span>*</span>
						<div className="px-4">
							<input
								type="radio"
								id="masculino"
								name="genero"
								value="MASCULINO"
								onChange={handleInputChange}
								checked={genero === "MASCULINO"}
							/>
							<span> </span>
							<label htmlFor="masculino"> Masculino</label>
						</div>
						<div className="px-4">
							<input
								type="radio"
								id="femenino"
								name="genero"
								value="FEMENINO"
								onChange={handleInputChange}
								checked={genero === "FEMENINO"}
							/>
							<span> </span>
							<label htmlFor="femenino"> Femenino</label>
						</div>
						<div className="px-4">
							<input
								type="radio"
								id="femenino"
								name="genero"
								value="MORAL"
								onChange={handleInputChange}
								checked={genero === "MORAL"}
							/>
							<span> </span>
							<label htmlFor="femenino"> Persona Moral</label>
						</div>
					</div>
				</div>

				<div className="row d-flex justify-content-center pt-3">
					<button type="submit" className="btn btn-outline-primary">
						<i className="far fa-save"></i>
						<span> Guardar</span>
					</button>
				</div>
			</form>
		</Modal>
	);
};
