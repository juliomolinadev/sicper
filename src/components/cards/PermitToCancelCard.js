import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { startLoadPreCancelPermits, unsetPermitToCancel } from "../../actions/permisosScreen";
import { cancelPermit } from "../../helpers/DB/cancelPermit";
import { getPermitStatus } from "../../helpers/DB/getPermitStatus";
import { denegarCancelacionDePermiso } from "../../helpers/denegarCancelacionDePermiso";

export const PermitToCancelCard = () => {
	const { preCancelPermits, permitToCancelSelected } = useSelector((state) => state.permisosScreen);
	const permit = preCancelPermits.find((perm) => perm.id === permitToCancelSelected);
	const { uid } = useSelector((state) => state.auth);
	const auth = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const cancelarPermiso = () => {
		Swal.fire({
			title: "Atención!!",
			text: `Está a punto de cancelar el permiso ${permit.numeroPermiso}, ¿Realmente desea cancelar este permiso?`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si",
			cancelButtonText: "No"
		}).then(async ({ isConfirmed }) => {
			if (isConfirmed) {
				const permitStatus = await getPermitStatus(
					permitToCancelSelected,
					permit.modulo,
					auth.variablesGlobales.cicloActual
				);
				console.log("permitStatus en lugar: ", permitStatus);

				if (permitStatus === "En proceso de cancelación") {
					const isCancel = cancelPermit(permit, uid);
					if (isCancel) {
						dispatch(startLoadPreCancelPermits(auth.variablesGlobales.cicloActual));
						dispatch(unsetPermitToCancel());
					}
				}
			}
		});
	};

	const denegarCancelacion = () => {
		Swal.fire({
			title: "Denegar solicitud de cancelación.",
			text: `El estado del permiso ${permit.numeroPermiso} quedará como "activo".`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Confirmar",
			cancelButtonText: "Cancelar"
		}).then(async ({ isConfirmed }) => {
			if (isConfirmed) {
				const isDenied = denegarCancelacionDePermiso(
					permit.numeroPermiso,
					permit.modulo,
					permit.ciclo
				);
				if (isDenied) {
					dispatch(startLoadPreCancelPermits(auth.variablesGlobales.cicloActual));
					dispatch(unsetPermitToCancel());
				}
			}
		});
	};

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
				<button type="button" className="btn btn-outline-danger" onClick={cancelarPermiso}>
					<i className="fas fa-times"></i>
					<span> Cancelar</span>
				</button>

				<button type="button" className="btn btn-outline-primary ml-4" onClick={denegarCancelacion}>
					<span> Denegar</span>
				</button>
			</div>
		</div>
	);
};
