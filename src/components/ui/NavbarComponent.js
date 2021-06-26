import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const NavbarComponent = () => {
	const { privilegios } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(startLogout());
	};

	return (
		<div className="fixed-top">
			<Navbar bg="dark" variant="dark" expand="lg">
				<Navbar.Brand href="/">
					<img
						src="./logos/cna.png"
						height="50"
						className="d-inline-block align-top"
						alt="Logo comisión nacional del agua"
					/>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						{privilegios.pantallaInicio && (
							<NavLink to="/sicper" className="nav-link">
								Inicio
							</NavLink>
						)}

						{privilegios.pantallaPadron && (
							<NavLink to="/padron" className="nav-link">
								Padron
							</NavLink>
						)}

						{privilegios.pantallaPermisos && (
							<NavLink to="/permisos" className="nav-link">
								Permisos
							</NavLink>
						)}

						{privilegios.pantallaTransferencias && (
							<NavLink to="/transferencias" className="nav-link">
								Transferencias
							</NavLink>
						)}

						{privilegios.pantallaAsignacion && (
							<NavLink to="/asignacion" className="nav-link">
								Asignacion
							</NavLink>
						)}

						{privilegios.pantallaLabores && (
							<NavLink to="/labores" className="nav-link">
								Labores
							</NavLink>
						)}

						{privilegios.pantallaAutorizados && (
							<NavLink to="/autorizados" className="nav-link">
								Autorizados
							</NavLink>
						)}

						{privilegios.pantallaReportes && (
							<NavLink to="/reportes" className="nav-link">
								Reportes
							</NavLink>
						)}

						{privilegios.pantallaConfiguracion && (
							<NavLink to="/configuracion" className="nav-link">
								Configuracion
							</NavLink>
						)}

						{privilegios.testArea && (
							<NavLink to="/test" className="nav-link">
								Test
							</NavLink>
						)}
					</Nav>

					<Button variant="outline-secondary btn-sm" onClick={handleLogout} to="/login">
						Salir
					</Button>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};
