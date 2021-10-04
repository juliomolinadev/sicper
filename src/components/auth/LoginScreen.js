import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { /* startGoogleLogin, */ startLoginEmailPassword } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./_auth.scss";

export const LoginScreen = () => {
	const dispatch = useDispatch();
	const { loading } = useSelector((state) => state.ui);

	const [formValues, handleInputChange] = useForm({
		email: "",
		password: ""
	});

	const { email, password } = formValues;

	const handleLogin = (e) => {
		e.preventDefault();
		dispatch(startLoginEmailPassword(email, password));
	};

	// const handleGoogleLogin = () => {
	// 	dispatch(startGoogleLogin());
	// };

	return (
		<>
			<h3 className="auth__title">Login</h3>

			<form onSubmit={handleLogin}>
				<input
					type="text"
					placeholder="Email"
					name="email"
					className="auth__input"
					autoComplete="off"
					value={email}
					onChange={handleInputChange}
				/>

				<input
					type="password"
					placeholder="Password"
					name="password"
					className="auth__input"
					value={password}
					onChange={handleInputChange}
				/>

				<button type="submit" className="btn btn-outline-primary btn-block mt-3" disabled={loading}>
					Login
				</button>

				{/* <div className="auth__social-networks">
					<p>Login con redes</p>

					<div className="google-btn" onClick={handleGoogleLogin}>
						<div className="google-icon-wrapper">
							<img
								className="google-icon"
								src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
								alt="google button"
							/>
						</div>
						<p className="btn-text">
							<b>Login con google</b>
						</p>
					</div>
				</div> */}
				<div className="pt-4">
					<Link to="/auth/register" className="link">
						Crear nuevo usuario
					</Link>
				</div>
			</form>
		</>
	);
};
