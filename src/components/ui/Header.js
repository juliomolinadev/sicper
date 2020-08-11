import React from "react";
import { getEntidadesByUser } from "../../selectors/getEntidadByUser";

const entidad = getEntidadesByUser("1");

export const Header = () => {
	return (
		<div className="pt-4">
			<div className="row m-3 pt-5">
				<div className="col-sm-2 text-center ">
					<div className="border rounded h-100 d-flex justify-content-center">
						<img
							className="align-self-center"
							src={`./logos/${entidad.img}`}
							alt="Logo de modulo 19"
							style={{ maxHeight: 100 }}
						/>
					</div>
				</div>
				<div className="col-sm-10">
					<div className=" card border">
						<div className="card-header">{entidad.nombre}</div>
						<div className="card-body text-dark">
							<h5 className="card-title">Plataforma digital</h5>
							<p className="card-text">Distrito de riego 014 Rio Colorado</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
