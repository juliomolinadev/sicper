import React, { useState } from "react";
import Swal from "sweetalert2";
import { saveTechnicianLocalties } from "../../helpers/DB/saveTechnicianLocalties";
// import { saveTechnicianLocalties } from "../../helpers/DB/saveTechnicianLocalties";
import { types } from "../../types/types";

export const SelectedLocaltiesDetail = ({ state, dispatch }) => {
	const { selectedLocalties, technicians, technicianSelected } = state;

	const [technicianId, setTechnicianId] = useState("");

	const handleSetTechnician = async ({ target }) => {
		setTechnicianId(target.value);
		const technician = technicians.find((technician) => technician.id === target.value);
		dispatch({ type: types.setTechnicianSelected, payload: technician });

		// asignarTecnico(permiso.modulo, permiso.folio, target.value);
		// dispatch(startLoadPermisosSearch(rol === "tecnicoCESVBC" ? uid : 0, state.palabra));
	};

	const handleSaveChanges = async () => {
		if (technicianId.length > 0) {
			const otherTechnicians = [];
			state.technicians.forEach((technician) => {
				if (technician.id !== technicianId) {
					otherTechnicians.push({
						id: technician.id,
						nombre: technician.displayName,
						localidades: technician.localidades ?? []
					});
				}
			});

			const localtiesIds = [];
			selectedLocalties.forEach((localtie) => localtiesIds.push(localtie.clave));

			const updates = await saveTechnicianLocalties(
				technicianId,
				technicianSelected.displayName,
				localtiesIds,
				otherTechnicians
			);
			if (updates)
				dispatch({
					type: types.updateTechnicians,
					payload: updates
				});
		} else {
			Swal.fire(
				"Técnico no seleccionado!",
				"Por favor indique el técnico a quien le serán asignadas las localidades seleccionadas.",
				"warning"
			);
		}
	};

	return (
		<div className="border border-info rounded text-center p-3">
			<h4>Localidades seleccionadas: {selectedLocalties.length}</h4>
			{/* <div>Técnico: {technicianSelected ? technicianSelected.displayName : "Sin asignar"}</div> */}

			<select
				name="campo"
				id="campo"
				type="text"
				value={technicianId}
				onChange={handleSetTechnician}
				className="form-control mt-4"
			>
				<option hidden defaultValue="">
					Seleccionar Técnico
				</option>

				{technicians.map((technician) => (
					<option key={technician.id} value={technician.id}>
						{technician.displayName}
					</option>
				))}
			</select>

			<button onClick={handleSaveChanges} className="btn btn-success mt-4">
				Aplicar cambios
			</button>
		</div>
	);
};
