import React from "react";
import { CustomTable } from "../tables/CustomTable";
import { usuariosColumns } from "../tables/configTables";
import { startSetUsuarioSelected } from "../../actions/usuarios";
import { UsuarioInput } from "../permisos/inputsNuevosPermisos/UsuarioInput";
import { useSelector } from "react-redux";
import { UsuarioSelectedDetail } from "./UsuarioSelectedDetail";
import { UpdatePadronModule } from "../ui/organisms/UpdatePadronModule";

export const PadronScreen = () => {
	const { usuarios, idUsuarioSelected } = useSelector((state) => state.altaPermisos);

	let data = [];

	if (usuarios.length > 0) {
		data = Object.values(usuarios);
	}

	return (
		<>
			<div className="row mt-3 d-flex justify-content-start">
				<UsuarioInput />
			</div>

			{data.length > 0 && (
				<div className="row">
					<div className="col-sm-8 mb-3">
						<CustomTable
							title={data.length === 0 ? "No se encontraron usuarios" : "Usuarios"}
							columns={usuariosColumns}
							data={data}
							setFunction={startSetUsuarioSelected}
						></CustomTable>
					</div>

					<div className="col-sm-4">{idUsuarioSelected && <UsuarioSelectedDetail />}</div>
				</div>
			)}

			<div className="border border-info rounded p-3 mt-3">
				<h3 className="row d-flex justify-content-center">Actualizar padron de usuarios</h3>
				<div className="row">
					<div className="col-sm-6 mt-3 mb-3">
						<UpdatePadronModule />
					</div>

					<div className="col-sm-6 mt-3 mb-3">
						<h5>Cargar reacomodos</h5>
					</div>
				</div>
			</div>
		</>
	);
};
