import React from "react";
import { useEffect } from "react";
import { loadTechnician } from "../../helpers/DB/loadTechnician";
import { types } from "../../types/types";
import { techniciansColumns } from "./configTables";
import { CustomTable } from "./CustomTable";

export const TechnicianTable = ({ state, dispatch }) => {
	const { technicians } = state;

	useEffect(() => {
		loadTechnician().then((techniciasns) => {
			dispatch({ type: types.setTechnicians, payload: techniciasns });
		});
	}, [dispatch]);

	const handleSetTechnician = (technician) => {
		dispatch({ type: types.setTechnicianSelected, payload: technician });
	};

	return (
		<CustomTable
			title={technicians.length === 0 ? "No se encontraron técnicos" : "Técnicos"}
			columns={techniciansColumns}
			data={technicians}
			simpleSetFunction={handleSetTechnician}
		/>
	);
};
