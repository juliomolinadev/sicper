import React from "react";
import { useSelector } from "react-redux";
import { usuariosColumns } from "../tables/configTables";
import { CustomTable } from "../tables/CustomTable";
import { startSetUsuarioSelected } from "../../actions/usuarios";

export const UsuariosTable = () => {
	const { usuarios } = useSelector((state) => state.entidades);

	let data = [];

	if (usuarios) {
		data = Object.values(usuarios);
		return (
			<CustomTable
				title={data.length === 0 ? "No se encontraron usuarios" : "Usuarios"}
				columns={usuariosColumns}
				data={data}
				setFunction={startSetUsuarioSelected}
			></CustomTable>
		);
	} else {
		return <></>;
	}
};
