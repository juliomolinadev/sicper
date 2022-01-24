import React from "react";
import { types } from "../../types/types";
import { CustomSelectableTable } from "../tables/CustomSelectableTable";
import { asignacionLocaltiesColumns } from "./configTables";

export const SelectableLocaltiesTable = ({ localties, dispatch }) => {
	const startSetSelectedLocalties = (selectedLocalties) => {
		dispatch({ type: types.setSelectedLocaltiesAsignacion, payload: selectedLocalties });
	};

	const contextMessage = { singular: "localidad", plural: "localidades", message: "para asignar" };

	return (
		<CustomSelectableTable
			title={"Localidades disponibles"}
			columns={asignacionLocaltiesColumns}
			data={localties}
			simpleSetSelectedRowsFunction={startSetSelectedLocalties}
			contextMessage={contextMessage}
		/>
	);
};
