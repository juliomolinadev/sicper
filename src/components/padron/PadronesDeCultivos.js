import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import { setConcesionSelected, startSetPadronesCultivos } from "../../actions/padronScreenActions";
import { openProductoresModal, startLoadProductores } from "../../actions/productores";
import { removeError } from "../../actions/ui";
import { ProductorModal } from "../modals/ProductorModal";
import { concesionesColumns } from "../tables/configTables";
import { CustomTable } from "../tables/CustomTable";
import { ConcesionCard } from "./ConcesionCard";

export const PadronesDeCultivos = () => {
	const { padronScreen } = useSelector((state) => state);
	const { cicloActual } = useSelector((state) => state.auth.variablesGlobales);
	const { idProductorSelected, productores } = useSelector((state) => state.altaPermisos);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(startSetPadronesCultivos());
		dispatch(removeError());
	}, [dispatch]);

	const [cultivo, setCultivo] = useState();

	useEffect(() => {
		if (productores.length > 0 && idProductorSelected) {
			const productor = productores.find((productor) => productor.id === idProductorSelected);
			dispatch(
				setConcesionSelected({
					id: `${productor.id}-${cultivo}-`,
					supExpedida: 0,
					supConcesion: 0,
					idProductor: productor.id,
					nombre: `${productor.apPaterno} ${productor.apMaterno} ${productor.nombre}`,
					curp: productor.curp,
					ciclo: cicloActual,
					modulo: false,
					cultivo
				})
			);
		}
	}, [idProductorSelected, cicloActual, cultivo, productores, dispatch]);

	const data = padronScreen.padrones
		? padronScreen.padrones.concesiones.filter((concesion) => concesion.cultivo === cultivo)
		: [];

	const [nameFilter, setNameFilter] = useState("");

	const filteredData = data.filter((registro) =>
		registro.nombre.includes(nameFilter.toUpperCase())
	);

	const handleOpenProductorModal = () => {
		if (nameFilter.length > 0) {
			dispatch(openProductoresModal());
			dispatch(startLoadProductores(nameFilter.toUpperCase()));
		} else {
			Swal.fire("Nada para buscar", "Ingrese apellido paterno del productor", "warning");
		}
	};

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

					{cultivo && (
						<>
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
								<div
									className="btn btn-outline-primary col-sm-2 ml-2"
									onClick={handleOpenProductorModal}
								>
									<i className="fas fa-plus mr-2"></i>
									<span>Registrar Productor</span>
								</div>
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
				</>
			)}

			<ProductorModal />
		</div>
	);
};
