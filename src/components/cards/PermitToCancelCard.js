import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { startLoadPreCancelPermits, unsetPermitToCancel } from "../../actions/permisosScreen";
import { cancelPermit } from "../../helpers/DB/cancelPermit";

export const PermitToCancelCard = () => {
	const { preCancelPermits, permitToCancelSelected } = useSelector((state) => state.permisosScreen);
	const { modulo } = useSelector((state) => state.auth);

	const permit = preCancelPermits.find((perm) => perm.id === permitToCancelSelected);
	const { numeroPermiso, motivoCancelacion } = permit;

	const elements = {
		MODULO: permit.modulo,
		CUENTA: permit.cuenta,
		USUARIO: permit.usuario,
		CULTIVO: permit.nombreCultivo,
		"SUPERFICIE (ha)": permit.supAutorizada
	};

	// TODO: crear funcion para definir ciclo
	const ciclo = "2020-2021";

	const dispatch = useDispatch();

	const cancelarPermiso = () => {
		Swal.fire({
			// input: "textarea",
			// inputPlaceholder: "Indique la razón por la que desea cancelar el permiso",

			title: "Atención!!",
			text: `Está a punto de cancelar el permiso ${numeroPermiso}, ¿Realmente desea cancelar este permiso?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si",
			cancelButtonText: "No"
		}).then(({ isConfirmed }) => {
			if (isConfirmed) {
				cancelPermit(permitToCancelSelected, modulo, ciclo, new Date());
				dispatch(startLoadPreCancelPermits(ciclo));
				dispatch(unsetPermitToCancel());
				Swal.fire(
					"Permiso cancelado",
					`Se canceló con exito el permiso ${numeroPermiso}`,
					"success"
				);
			}
		});
	};

	return (
		<div className="border border-info rounded detallePermiso">
			<div className="d-flex bg-light border-info border-bottom rounded-top p-1 justify-content-center font-weight-bold text-secondary pt-3">
				<h5>{numeroPermiso}</h5>
			</div>

			<div className="m-3">
				<div className="row p-1 pl-2 text-warning">
					<div className="col-4">MOTIVO: </div>
					<div className="col-8">{motivoCancelacion}</div>
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
				<button type="button" className="btn btn-outline-danger" onClick={cancelarPermiso}>
					<i className="fas fa-times"></i>
					<span> Cancelar</span>
				</button>
			</div>
		</div>
	);
};
