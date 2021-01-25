import React from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

//TODO: Aser que la navbar sea resposive

export const NavbarComponent = () => {
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
						<Link to="/sicper" className="nav-link">
							Inicio
						</Link>
						<Link to="/padron" className="nav-link">
							Padron
						</Link>
						<Link to="/permisos" className="nav-link">
							Permisos
						</Link>
						<Link to="/transferencias" className="nav-link">
							Transferencias
						</Link>
						<Link to="/reportes" className="nav-link">
							Reportes
						</Link>
						<Link to="/autorizados" className="nav-link">
							Autorizados
						</Link>
						<Link to="/configuracion" className="nav-link">
							Configuracion
						</Link>
					</Nav>

					<Button variant="outline-secondary btn-sm" onClick={handleLogout} to="/login">
						Salir
					</Button>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};
