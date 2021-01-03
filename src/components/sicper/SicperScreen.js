import React from "react";
import { Link } from "react-router-dom";
import { SuperficiesChart } from "../charts/SuperficiesChart";
import { useDispatch, useSelector } from "react-redux";
import { startLoadSuperficies } from "../../actions/permisosScreen";

export const SicperScreen = () => {
	const dispatch = useDispatch();

	const { superficies } = useSelector((state) => state.permisosScreen);
	const { claveEntidad } = useSelector((state) => state.auth);

	if (superficies === null) {
		dispatch(startLoadSuperficies(claveEntidad));
	}

	return (
		<>
			<div className="row pt-5">
				<div className="col-sm-8 pr-4">
					<div className="row d-flex">
						<div className="col-sm-4">
							<Link to="/nuevo-permiso">
								<button className="btn btn-outline-primary" type="button">
									<span>Nuevo Permiso </span>
									<i className="fas fa-plus"></i>
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>

			<div className="row pt-3 pb-4 pr-3">
				<div className="col-sm-4 border border-info rounded detallePermiso">
					<SuperficiesChart />
				</div>
			</div>
		</>
	);
};
