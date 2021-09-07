import React from "react";
import { useSelector } from "react-redux";

export const PermitToCancelCard = () => {
	const { preCancelPermits, permitToCancelSelected } = useSelector((state) => state.permisosScreen);

	const permit = preCancelPermits.find((perm) => perm.id === permitToCancelSelected);

	const elements = {
		MODULO: permit.modulo,
		CUENTA: permit.cuenta,
		USUARIO: permit.usuario,
		CULTIVO: permit.nombreCultivo,
		"SUPERFICIE (ha)": permit.supAutorizada
	};

	return (
		<div className="border border-info rounded detallePermiso">
			<div className="d-flex bg-light border-info border-bottom rounded-top p-1 justify-content-center font-weight-bold text-secondary pt-3">
				<h5>{permit.numeroPermiso}</h5>
			</div>

			<div className="m-3">
				<div className="row p-1 pl-2 text-warning">
					<div className="col-4">MOTIVO: </div>
					<div className="col-8">{permit.motivoCancelacion}</div>
				</div>

				{Object.entries(elements).map((element) => {
					return (
						<div className="row p-1 pl-2" key={element[0]}>
							<div className="col-4">{element[0]}: </div>
							<div className="col-8">{element[1]}</div>
						</div>
					);
				})}
			</div>

			<div className="mb-3 d-flex justify-content-center">
				<button type="button" className="btn btn-outline-danger" /* onClick={cancelarPermiso} */>
					<i className="fas fa-times"></i>
					<span> Cancelar</span>
				</button>
			</div>
		</div>
	);
};
