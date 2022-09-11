import React from "react";
import { useSelector } from "react-redux";
import { startSetCultivoSelected } from "../../actions/cultivos";
import { CultivoCard } from "../cards/CultivoCard";
import { cultivosColumns } from "../tables/configTables";
import { CustomTable } from "../tables/CustomTable";

export const CatalogoDeCultivos = () => {
	const { cultivos, idCultivoSelected } = useSelector((state) => state.altaPermisos);
	const cultivoSelected = cultivos.find((cultivo) => cultivo.id === idCultivoSelected);

	// console.log("cultivoSelected en Catalogo: ", cultivoSelected);
	return (
		<div>
			<h2>Catalogo de cultivos</h2>

			<div className="row">
				<div className="col-sm-8">
					<CustomTable
						title={cultivos.length === 0 ? "No se encontraron cultivos" : "Cultivos"}
						columns={cultivosColumns}
						data={cultivos}
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
