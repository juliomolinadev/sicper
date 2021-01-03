import React from "react";
import { useDispatch } from "react-redux";
import { startLogout } from "../../actions/auth";
import { Navbar, Nav, Button } from "react-bootstrap";

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
						<Nav.Link href="/sicper">Inicio</Nav.Link>
						<Nav.Link href="/padron">Padron</Nav.Link>
						<Nav.Link href="/permisos">Permisos</Nav.Link>
						<Nav.Link href="/transferencias">Transferencias</Nav.Link>
						<Nav.Link href="/reportes">Reportes</Nav.Link>
						<Nav.Link href="/autorizados">Autorizados</Nav.Link>
						<Nav.Link href="/configuracion">Configuracion</Nav.Link>
					</Nav>

					<Button variant="outline-secondary btn-sm" onClick={handleLogout} to="/login">
						Salir
					</Button>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};
