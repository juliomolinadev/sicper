import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	startSetSystemUserSelected,
	startLoadSystemUsers
} from "../../actions/entidades/sistemUsers";
import { systemUsersColumns } from "../tables/configTables";
import { CustomTable } from "../tables/CustomTable";

export const SystemUsersTable = () => {
	const { systemUsers } = useSelector((state) => state.entidades);
	const { claveEntidad } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	let data = [];

	if (!systemUsers) {
		dispatch(startLoadSystemUsers(claveEntidad));
	}

	if (systemUsers) {
		data = Object.values(systemUsers);
		return (
			<CustomTable
				title={data.length === 0 ? "No se encontraron usuarios" : "Usuarios"}
				columns={systemUsersColumns}
				data={data}
				setFunction={startSetSystemUserSelected}
			></CustomTable>
		);
	} else {
		return <></>;
	}
};
