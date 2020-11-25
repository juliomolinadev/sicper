import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";

//TODO: Aser que la navbar sea resposive

export const Navbar = () => {
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(startLogout());
	};

	return (
		<nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
			<Link className="navbar-brand" to="/">
				<img
					className=""
					src={"./logos/cna.png"}
					alt="Logo comisión nacional del agua"
					style={{ maxHeight: 50 }}
				/>
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse " id="navbarNav">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item">
						<NavLink activeClassName="active" className="nav-link" exact to="/sicper">
							Inicio
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink activeClassName="active" className="nav-link" exact to="/padron">
							Padron
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink activeClassName="active" className="nav-link" exact to="/permisos">
							Permisos
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink activeClassName="active" className="nav-link" exact to="/transferencias">
							Transferencias
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink activeClassName="active" className="nav-link" exact to="/reportes">
							Reportes
						</NavLink>
					</li>
					<li className="nav-item">
						<NavLink activeClassName="active" className="nav-link" exact to="/configuracion">
							Configuracion
						</NavLink>
					</li>
				</ul>
				{/* </div>

			<div className="navbar-collapse collapse w-100 order-3 dual-collapse2"> */}
				<ul className="my-2 my-lg-0 ">
					<NavLink
						activeClassName="active"
						className="btn btn-outline-secondary btn-sm"
						onClick={handleLogout}
						exact
						to="/login"
					>
						<i className="fas fa-sign-out-alt"></i>
						Salir
					</NavLink>
				</ul>
			</div>
		</nav>
	);
};
