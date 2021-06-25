import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../hooks/useForm";
import Swal from "sweetalert2";
import { startLoadUsuarios } from "../../actions/usuarios";

export const UsuariosInput = () => {
	const { modulo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const handleLoadUsuarios = () => {
		if (usuario.length > 0) {
			dispatch(startLoadUsuarios(usuario.toUpperCase(), modulo));
		} else {
			Swal.fire("Nada para buscar", "Ingrese apellido paterno o cuenta del usuario", "warning");
		}
	};

	const [formValues, handleInputChange] = useForm({
		usuario: ""
	});

	const { usuario } = formValues;

	const handleKeyUp = (event) => {
		if (event.key === "Enter") {
			handleLoadUsuarios();
		}
	};
	return (
		<div>
			<div className="row form-group d-flex align-items-baseline pt-3">
				<label className="col-sm-3">Usuario: </label>
				<div className="col-sm-9 d-flex">
					<input
						type="text"
						className="form-control"
						placeholder="Apellido paterno o numero de cuenta"
						name="usuario"
						autoComplete="off"
						value={usuario}
						onChange={handleInputChange}
						onKeyUp={handleKeyUp}
					/>

					<button
						className=" btn btn-outline-primary d-sm-block ml-auto"
						type="button"
						onClick={handleLoadUsuarios}
					>
						<i className="fas fa-search"></i>
					</button>
				</div>
			</div>
		</div>
	);
};
