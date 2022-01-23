import React, { useEffect } from "react";
import { loadLocaltiesFromUnassignedPermits } from "../../helpers/loadLocaltiesFromUnassignedPermits";
import { types } from "../../types/types";
import { CustomSelectableTable } from "../tables/CustomSelectableTable";
import { asignacionLocaltiesColumns } from "./configTables";

export const SelectableLocaltiesTable = ({ state, dispatch }) => {
	const { localties } = state;

	useEffect(() => {
		loadLocaltiesFromUnassignedPermits().then((localtie) => {
			dispatch({ type: types.setLocaltiesAsignacion, payload: localtie });
		});
	}, [dispatch]);

	const startSetSelectedLocalties = (localties) => {
		dispatch({ type: types.setSelectedLocaltiesAsignacion, payload: localties });
	};

	const contextMessage = { singular: "localidad", plural: "localidades", message: "para asignar" };

	if (localties.length > 0) {
		return (
			<CustomSelectableTable
				title={"Localidades disponibles"}
				columns={asignacionLocaltiesColumns}
				data={localties}
				simpleSetSelectedRowsFunction={startSetSelectedLocalties}
				contextMessage={contextMessage}
			/>
		);
	} else return <></>;
};
