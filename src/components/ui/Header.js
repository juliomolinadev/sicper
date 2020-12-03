import React from "react";
import { useSelector } from "react-redux";

export const Header = () => {
	const { name, entidad, img } = useSelector((state) => state.auth);

	return (
		<>
			<div className="row d-flex justify-content-between header">
				<div className="col-sm-2 text-center ">
					<div className="border rounded h-100 d-flex justify-content-center">
						<img
							className="align-self-center"
							src={`./logos/${img}`}
							alt="Logo de modulo 19"
							style={{ maxHeight: 100 }}
						/>
					</div>
				</div>
				<div className="col-sm-10">
					<div className="card border">
						<div className="card-header">{`${entidad} - Operador: ${name}`}</div>
						<div className="card-body text-dark">
							<h5 className="card-title">Plataforma digital</h5>
							<p className="card-text">Distrito de riego 014 Rio Colorado</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
