import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavbarComponent = () => {
	const { rol } = useSelector((state) => state.auth);

	const dev = rol === "dev" ? true : false;
	const operadorModulo = rol === "operadorModulo" ? true : false;
	const adminCNA = rol === "adminCNA" ? true : false;
	const tecnicoCESVBC = rol === "tecnicoCESVBC" ? true : false;

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
						{dev || operadorModulo || adminCNA ? (
							<Link to="/sicper" className="nav-link">
								Inicio
							</Link>
						) : (
							<></>
						)}

						{dev || operadorModulo || adminCNA ? (
							<Link to="/padron" className="nav-link">
								Padron
							</Link>
						) : (
							<></>
						)}

						{dev || operadorModulo || adminCNA ? (
							<Link to="/permisos" className="nav-link">
								Permisos
							</Link>
						) : (
							<></>
						)}

						{dev || tecnicoCESVBC ? (
							<Link to="/algodonero" className="nav-link">
								Algodonero
							</Link>
						) : (
							<></>
						)}

						{dev || operadorModulo || adminCNA ? (
							<Link to="/transferencias" className="nav-link">
								Transferencias
							</Link>
						) : (
							<></>
						)}

						{dev || operadorModulo || adminCNA || tecnicoCESVBC ? (
							<Link to="/reportes" className="nav-link">
								Reportes
							</Link>
						) : (
							<></>
						)}

						{dev || adminCNA ? (
							<Link to="/autorizados" className="nav-link">
								Autorizados
							</Link>
						) : (
							<></>
						)}

						{dev || operadorModulo || adminCNA ? (
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
