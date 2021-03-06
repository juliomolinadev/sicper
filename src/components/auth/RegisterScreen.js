import React from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { Link } from "react-router-dom";

import { useForm } from "../../hooks/useForm";
import { removeError, setError } from "../../actions/ui";
import { startRegisterWithEmailPasswordName } from "../../actions/auth";

export const RegisterScreen = () => {
	const dispatch = useDispatch();
	const { msgError } = useSelector((state) => state.ui);

	const [formValues, handleInputChange] = useForm();

	const { name, email, password, password2 } = formValues;

	const handleRegister = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			dispatch(startRegisterWithEmailPasswordName(email, password, name));
		}
	};

	const isFormValid = () => {
		if (name.trim().length === 0) {
			dispatch(setError("Se requiere el nombre"));
			return false;
		} else if (!validator.isEmail(email)) {
			dispatch(setError("Email no valido"));
			return false;
		} else if (password !== password2 || password.length < 5) {
			dispatch(setError("Password diferentes o menor de 5 caracteres"));
			return false;
		}

		dispatch(removeError());

		return true;
	};

	return (
		<>
			<h3 className="auth__title">Registro</h3>

			<form onSubmit={handleRegister}>
				{msgError && <div className="auth__alert-error">{msgError}</div>}
				<input
					type="text"
					placeholder="Nombre"
					name="name"
					className="auth__input"
					autoComplete="off"
					onChange={handleInputChange}
				/>

				<input
					type="text"
					placeholder="Email"
					name="email"
					className="auth__input"
					autoComplete="off"
					onChange={handleInputChange}
				/>

				<input
					type="password"
					placeholder="Password"
					name="password"
					className="auth__input"
					onChange={handleInputChange}
				/>

				<input
					type="password"
					placeholder="Confirmar password"
					name="password2"
					className="auth__input"
					onChange={handleInputChange}
				/>

				<button type="submit" className="btn btn-primary btn-block mb-5">
					Crear usuario
				</button>

				<Link to="/auth/login" className="link">
					Ya esta registrado?
				</Link>
			</form>
		</>
	);
};
