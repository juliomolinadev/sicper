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

	const { name, email, password, password2, modulo } = formValues;

	const handleRegister = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			dispatch(startRegisterWithEmailPasswordName(email, password, name, modulo));
		}
	};

	const isFormValid = () => {
		if (!modulo) {
			dispatch(setError("Seleccione entidad"));
			return false;
		} else if (!name) {
			dispatch(setError("Se requiere el nombre"));
			return false;
		} else if (!email) {
			dispatch(setError("Se requiere email"));
			return false;
		} else if (!validator.isEmail(email)) {
			dispatch(setError("Email no valido"));
			return false;
		} else if (!password) {
			dispatch(setError("Se requiere password"));
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
				<select
					type="text"
					name="modulo"
					value={modulo}
					onChange={handleInputChange}
					className="auth__input"
				>
					<option hidden defaultValue={false}>
						Entidad
					</option>
					<option value="1">Modulo 1</option>
					<option value="2">Modulo 2</option>
					<option value="3">Modulo 3</option>
					<option value="4">Modulo 4</option>
					<option value="5">Modulo 5</option>
					<option value="6">Modulo 6</option>
					<option value="7">Modulo 7</option>
					<option value="8">Modulo 8</option>
					<option value="9">Modulo 9</option>
					<option value="9B">Modulo 9B</option>
					<option value="10">Modulo 10</option>
					<option value="11">Modulo 11</option>
					<option value="12">Modulo 12</option>
					<option value="14">Modulo 14</option>
					<option value="15">Modulo 15</option>
					<option value="16">Modulo 16</option>
					<option value="17">Modulo 17</option>
					<option value="18">Modulo 18</option>
					<option value="19">Modulo 19</option>
					<option value="20">Modulo 20</option>
					<option value="21">Modulo 21</option>
					<option value="22">Modulo 22</option>
					<option value="FL">Modulo FL</option>
					<option value="SADER">SADER</option>
					<option value="CNA">CNA</option>
					<option value="CESVBC">CESVBC</option>
					<option value="SRL">SRL</option>
				</select>

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

				<button type="submit" className="btn btn-outline-primary btn-block mt-3 mb-5">
					Crear usuario
				</button>

				<Link to="/auth/login" className="link">
					Ya esta registrado?
				</Link>
			</form>
		</>
	);
};
