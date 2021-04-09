import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setSelectedLocalties,
	startLoadLocaltiesFromUnassignedPermits
} from "../../actions/entidades/localidades";
import { CustomSelectableTable } from "../tables/CustomSelectableTable";
import { localtiesColumns } from "./configTables";

export const SelectableLocaltiesTable = () => {
	const { localties } = useSelector((state) => state.entidades);

	const dispatch = useDispatch();

	if (!localties) {
		dispatch(startLoadLocaltiesFromUnassignedPermits());
	}

	const contextMessage = { singular: "localidad", plural: "localidades", message: "para asignar" };

	return (
		<CustomSelectableTable
			title={"Localidades disponibles"}
			columns={localtiesColumns}
			data={localties}
			setSelectedRowsFunction={setSelectedLocalties}
			contextMessage={contextMessage}
		/>
	);
};
