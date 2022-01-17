import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadPermisosSearch } from "../../actions/algodoneroScreen";
import { asignarTecnico } from "../../helpers/DB/asignarTecnico";

export const PermisoAsignacion = ({ state }) => {
	const dispatch = useDispatch();

	const { technicians } = state;
	const { permisos, permisoSelected } = useSelector((state) => state.algodoneroScreen);
	const permiso = permisos.find((permiso) => permiso.id === permisoSelected);
	const { folio, nombre, cuenta, tecnico } = permiso;
	const technicianSelected = technicians.find((technician) => technician.id === tecnico);

	const [technician, setTechnician] = useState("");

	const { uid, rol } = useSelector((state) => state.auth);

	const handleSetTechnician = ({ target }) => {
		setTechnician(target.value);
		asignarTecnico(permiso.modulo, permiso.folio, target.value);
		dispatch(startLoadPermisosSearch(rol === "tecnicoCESVBC" ? uid : 0, state.palabra));
	};

	return (
		<div className="border border-info rounded text-center p-3">
			<h4>{folio}</h4>
			<div>Cuenta: {cuenta}</div>
			<div>{nombre}</div>
			<div>Técnico: {technicianSelected ? technicianSelected.displayName : "Sin asignar"}</div>

			<select
				name="campo"
				id="campo"
				type="text"
				value={technician}
				onChange={handleSetTechnician}
				className="form-control mt-4"
			>
				<option hidden defaultValue="">
					Asignar Técnico
				</option>

				{technicians.map((technician) => (
					<option key={technician.id} value={technician.id}>
						{technician.displayName}
					</option>
				))}
			</select>
		</div>
	);
};
