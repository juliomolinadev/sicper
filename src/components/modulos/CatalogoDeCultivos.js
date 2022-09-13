import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { startSetCultivoSelected } from "../../actions/cultivos";
import { CultivoCard } from "../cards/CultivoCard";
import { cultivosColumns } from "../tables/configTables";
import { CustomTable } from "../tables/CustomTable";

export const CatalogoDeCultivos = () => {
	const { cultivos, idCultivoSelected } = useSelector((state) => state.altaPermisos);
	const cultivoSelected = cultivos.find((cultivo) => cultivo.id === idCultivoSelected);

	const [cultivoName, setCultivoName] = useState("");

	const filteredCultivos = cultivos.filter((cultivo) =>
		cultivo.nombre.includes(cultivoName.toUpperCase())
	);

	return (
		<div>
			<h2>Catalogo de cultivos</h2>

			<div className=" row mt-4">
				<label className="col-2">Nombre del cultivo:</label>
				<input
					type="text"
					className="col-4 form-control ml-1"
					placeholder="Nombre del cultivo"
					name="cultivoName"
					autoComplete="off"
					value={cultivoName}
					onChange={(e) => setCultivoName(e.target.value)}
				/>
			</div>

			<div className="row">
				<div className="col-sm-8">
					<CustomTable
						title={cultivos.length === 0 ? "No se encontraron cultivos" : "Cultivos"}
						columns={cultivosColumns}
						data={filteredCultivos}
						setFunction={startSetCultivoSelected}
					/>
				</div>

				<div className="col-sm-4">
					{cultivoSelected && <CultivoCard cultivo={cultivoSelected} />}
				</div>
			</div>
		</div>
	);
};
