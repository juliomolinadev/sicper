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
						{privilegios.accesoTotal ? (
							<Link to="/sicper" className="nav-link">
								Inicio
							</Link>
						) : (
							<></>
						)}

						{privilegios.accesoTotal ? (
							<Link to="/padron" className="nav-link">
								Padron
							</Link>
						) : (
							<></>
						)}

						{privilegios.accesoTotal ? (
							<Link to="/permisos" className="nav-link">
								Permisos
							</Link>
						) : (
							<></>
						)}

						{privilegios.accesoTotal ? (
							<Link to="/algodonero" className="nav-link">
								Algodonero
							</Link>
						) : (
							<></>
						)}

						{privilegios.accesoTotal ? (
							<Link to="/transferencias" className="nav-link">
								Transferencias
							</Link>
						) : (
							<></>
						)}

						{privilegios.accesoTotal ? (
							<Link to="/reportes" className="nav-link">
								Reportes
							</Link>
						) : (
							<></>
						)}

						{privilegios.accesoTotal ? (
							<Link to="/autorizados" className="nav-link">
								Autorizados
							</Link>
						) : (
							<></>
						)}

						{privilegios.accesoTotal ? (
							<Link to="/configuracion" className="nav-link">
								Configuracion
							</Link>
						) : (
							<></>
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
