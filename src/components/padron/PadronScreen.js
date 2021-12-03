import React, { useEffect, useState } from "react";
import { CustomTable } from "../tables/CustomTable";
import { usuariosColumns } from "../tables/configTables";
import {
	startSetUsuarioSelected,
	unsetUsuarios,
	unsetUsuarioSelected
} from "../../actions/usuarios";
import { UsuarioInput } from "../permisos/inputsNuevosPermisos/UsuarioInput";
import { useDispatch, useSelector } from "react-redux";
import { UsuarioSelectedDetail } from "./UsuarioSelectedDetail";
import { UpdatePadronModule } from "../ui/organisms/UpdatePadronModule";
import { UpdateReacomodosModule } from "../ui/organisms/UpdateReacomodosModule";
import { DownloadPadronButton } from "../ui/atoms/DownloadPadronButton";

export const PadronScreen = () => {
	const { usuarios, usuario } = useSelector((state) => state.entidades);
	const { privilegios } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(unsetUsuarioSelected());
		dispatch(unsetUsuarios());
	}, [dispatch]);

	let data = [];

	if (usuarios) {
		data = Object.values(usuarios);
	}

	const [global, setGlobal] = useState(false);
	const handleSetGlogal = () => {
		setGlobal(!global);
	};

	return (
		<>
			<div className="row mt-3 d-flex justify-content-start">
				<div className="col-sm-1 mt-3">
					{privilegios.accesoGlobal &&
						(global ? (
							<button onClick={handleSetGlogal} className="btn btn-primary mr-3">
								Global
							</button>
						) : (
							<button onClick={handleSetGlogal} className="btn btn-outline-primary mr-3">
								Global
							</button>
						))}
				</div>
				<UsuarioInput global={global} />

				<div className="col-sm-3">
					<DownloadPadronButton />
				</div>
			</div>

			{usuarios && (
				<div className="row">
					<div className="col-sm-8 mb-3">
						<CustomTable
							title={data.length === 0 ? "No se encontraron usuarios" : "Usuarios"}
							columns={usuariosColumns}
							data={data}
							setFunction={startSetUsuarioSelected}
						></CustomTable>
					</div>

					<div className="col-sm-4">{usuario && <UsuarioSelectedDetail />}</div>
				</div>
			)}

			{privilegios.actualizarPadron && (
				<div className="border border-info rounded p-3 mt-3">
					<h3 className="row d-flex justify-content-center">
						Actualizar padron de usuarios y reacomodos
					</h3>
					<div className="row">
						<div className="col-sm-6 mt-3 mb-3">
							<UpdatePadronModule />
						</div>

						<div className="col-sm-6 mt-3 mb-3">
							<UpdateReacomodosModule />
						</div>
					</div>
				</div>
			)}
		</>
	);
};
