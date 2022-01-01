import React from "react";

export const Page404 = () => {
	return (
		<div className="container">
			<div className="d-flex justify-content-center mt-5">
				<h1>Error 404</h1>
			</div>

			<div className="d-flex justify-content-center">
				<h2>Servidor no disponible !</h2>
			</div>

			<div className="d-flex justify-content-center mt-5">
				<img src="./logos/gears.jpeg" alt="gears" style={{ maxWidth: 400 }} />
			</div>

			<div className="d-flex justify-content-center mt-3">
				<h4>Por el momento el servicio no se encuentra disponible. Por favor intente más tarde.</h4>
			</div>
		</div>
	);
};
