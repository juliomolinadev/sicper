import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

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
							<Link to="/sicper" className="nav-link">
								Inicio
							</Link>
						)}

						{privilegios.pantallaPadron && (
							<Link to="/padron" className="nav-link">
								Padron
							</Link>
						)}

						{privilegios.pantallaPermisos && (
							<Link to="/permisos" className="nav-link">
								Permisos
							</Link>
						)}

						{privilegios.pantallaTransferencias && (
							<Link to="/transferencias" className="nav-link">
								Transferencias
							</Link>
						)}

						{privilegios.pantallaAsignacion && (
							<Link to="/asignacion" className="nav-link">
								Asignacion
							</Link>
						)}

						{privilegios.pantallaLabores && (
							<Link to="/labores" className="nav-link">
								Labores
							</Link>
						)}

						{privilegios.pantallaAutorizados && (
							<Link to="/autorizados" className="nav-link">
								Autorizados
							</Link>
						)}

						{privilegios.pantallaReportes && (
							<Link to="/reportes" className="nav-link">
								Reportes
							</Link>
						)}

						{privilegios.pantallaConfiguracion && (
							<Link to="/configuracion" className="nav-link">
								Configuracion
							</Link>
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
