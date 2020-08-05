// export const Navbar = () => {
// 	return (
// 		<div className="navbar navbar-dark bg-dark mb-4">
// 			<span className="navbar-brand">Juls</span>
// 			<button className="btn btn-outline-secondary">
// 				<i className="fas fa-sign-out-alt"></i>
// 				<span> Salir</span>
// 			</button>
// 		</div>
// 	);
// };

import React from "react";
import { Link, NavLink } from "react-router-dom";

//TODO: Aser que la navbar sea resposive

export const Navbar = () => {
	return (
		<nav className="navbar navbar-expand-sm navbar-dark bg-dark">
			<Link className="navbar-brand" to="/">
				Asociaciones
			</Link>

			<div className="navbar-collapse">
				<div className="navbar-nav">
					<NavLink activeClassName="active" className="nav-item nav-link" exact to="/sicper">
						Inicio
					</NavLink>

					<NavLink activeClassName="active" className="nav-item nav-link" exact to="/padron">
						Padron
					</NavLink>

					<NavLink activeClassName="active" className="nav-item nav-link" exact to="/permisos">
						Permisos
					</NavLink>

					<NavLink
						activeClassName="active"
						className="nav-item nav-link"
						exact
						to="/transferencias"
					>
						Transferencias
					</NavLink>

					<NavLink activeClassName="active" className="nav-item nav-link" exact to="/reportes">
						Reportes
					</NavLink>

					<NavLink activeClassName="active" className="nav-item nav-link" exact to="/configuracion">
						Configuracion
					</NavLink>
				</div>
			</div>

			<div className="navbar-collapse collapse w-100 order-3 dual-collapse2">
				<ul className="navbar-nav ml-auto">
					{/* <NavLink activeClassName="active" className="nav-item nav-link" exact to="/login"> */}
					<NavLink activeClassName="active" className="btn btn-outline-secondary" exact to="/login">
						<i className="fas fa-sign-out-alt"></i>
						Salir
					</NavLink>
				</ul>
			</div>
		</nav>
	);
};
