import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadEntities } from "../../actions/entidades/entities";
import { CicleSelector } from "./molecules/CicleSelector";
import { EntitySelector } from "./molecules/EntitySelector";

export const Header = () => {
	const { email, entidad, img, variablesGlobales, claveEntidad, privilegios } = useSelector(
		(state) => state.auth
	);
	const global = privilegios.accesoGlobal;

	const { entities } = useSelector((state) => state.entidades);

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(startLoadEntities());
	}, [dispatch]);

	const setImgStyle = (entidad) => {
		switch (entidad) {
			case "SADER":
			case "CNA":
			case "UNI01":
			case "UNI02":
			case "UNI03":
				return { maxWidth: 140 };

			default:
				return { maxHeight: 100 };
		}
	};

	return (
		<>
			<div className="row d-flex justify-content-between header">
				<div className="col-sm-2 text-center ">
					<div className="border rounded h-100 d-flex justify-content-center">
						<img
							className="align-self-center"
							src={`./logos/${img}`}
							alt="Logo de la entidad"
							style={setImgStyle(claveEntidad)}
						/>
					</div>
				</div>
				<div className="col-sm-10">
					<div className="card border">
						<div className="card-header d-inline-flex row">
							<div className="col-sm-3">{`${entidad} - Operador: ${email}`} </div>

							<div className="col-sm-2 ml-5">
								<b>Ciclo actual: {variablesGlobales.cicloActual}</b>
							</div>

							<div className="col-sm-6 d-flex align-items-center">
								<div className="mr-2">Consultas:</div>
								<CicleSelector />
							</div>
						</div>

						<div className="card-body text-dark">
							<h5 className="card-title">Plataforma digital</h5>{" "}
							<div className="row">
								<div className="col-sm-6 card-text">Distrito de riego 014 Rio Colorado</div>
								<div className="col-sm-6">{entities && global && <EntitySelector />}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;

//ssh check
