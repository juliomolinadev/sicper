import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setConcesionSelected, startSetPadronesCultivos } from "../../actions/padronScreenActions";
import { removeError } from "../../actions/ui";
import { concesionesColumns } from "../tables/configTables";
import { CustomTable } from "../tables/CustomTable";
import { ConcesionCard } from "./ConcesionCard";

export const PadronesDeCultivos = () => {
	const { padronScreen } = useSelector((state) => state);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(startSetPadronesCultivos());
		dispatch(removeError());
	}, [dispatch]);

	const [cultivo, setCultivo] = useState();

	const data = padronScreen.padrones
		? padronScreen.padrones.concesiones.filter((concesion) => concesion.cultivo === cultivo)
		: [];

	const [nameFilter, setNameFilter] = useState("");

	const filteredData = data.filter((registro) =>
		registro.nombre.includes(nameFilter.toUpperCase())
	);

	return (
		<div className="mt-5">
			{padronScreen.padrones && (
				<>
					<div className="btn-group btn-group-toggle d-print-none">
						{padronScreen.padrones.cultivos.map((cultivoName) => (
							<div
								key={cultivoName}
								className={`btn btn-outline-primary ${cultivoName === cultivo && "active"}`}
								onClick={() => setCultivo(cultivoName)}
							>
								{cultivoName}
							</div>
						))}
					</div>

					<div className=" row mt-4">
						<label className="col-sm-2">Nombre del productor:</label>
						<input
							type="text"
							className="col-sm-4 form-control ml-1"
							placeholder="Nombre del productor"
							name="cultivoName"
							autoComplete="off"
							value={nameFilter}
							onChange={(e) => setNameFilter(e.target.value)}
						/>
					</div>

					<div className="row">
						<div className="col-sm-8">
							<CustomTable
								title={filteredData.length === 0 ? "No se encontraron cultivos" : "Cultivos"}
								columns={concesionesColumns}
								data={filteredData}
								setFunction={setConcesionSelected}
							/>
						</div>

						<div className="col-sm-4">
							{padronScreen.concesionSelected && (
								<ConcesionCard concesion={padronScreen.concesionSelected} />
							)}
						</div>
					</div>
				</>
			)}
		</div>
	);
};
