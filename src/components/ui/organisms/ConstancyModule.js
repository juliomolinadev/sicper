import React, { useState } from "react";
import { useConstancyModuleState } from "../../../hooks/useConstancyModuleState";
import { ConstancySelectedDetail } from "../../padron/ConstancySelectedDetail";
import { usuariosColumns } from "../../tables/configTables";
import { CustomTable } from "../../tables/CustomTable";

export const ConstancyModule = ({ modalState, setModalState }) => {
	const [moduleState, setModuleState] = useState({
		usuario: "",
		constancySelected: false,
		constancies: []
	});
	const { usuario, constancySelected, constancies } = moduleState;

	const [
		handleInputChange,
		clearUsuarioInput,
		handleSetConstancies,
		handleKeyUp,
		setConstancylected
	] = useConstancyModuleState(moduleState, setModuleState);

	return (
		<>
			<h4>Consulta de constancias</h4>

			<div className="row mt-3">
				<div className="col-sm-8">
					<div className="d-flex form-group align-items-baseline">
						<label>Usuario: </label>

						{constancySelected ? (
							<div className="ml-2">
								<label>
									{`${constancySelected.apPaterno} ${constancySelected.apMaterno} ${constancySelected.nombre}`}
								</label>

								<i className="fas fa-check text-success p-3"></i>

								<button
									className=" btn btn-outline-primary"
									type="button"
									onClick={clearUsuarioInput}
								>
									<i className="fas fa-trash"></i>
								</button>
							</div>
						) : (
							<>
								<input
									type="text"
									className="form-control ml-3"
									placeholder="Apellido paterno o numero de cuenta"
									autoComplete="off"
									value={usuario}
									onChange={handleInputChange}
									onKeyUp={handleKeyUp}
								/>

								<button
									className="btn btn-outline-primary"
									type="button"
									onClick={handleSetConstancies}
								>
									<i className="fas fa-search"></i>
								</button>
							</>
						)}
					</div>
				</div>
			</div>

			{constancies.length > 0 && (
				<div className="row mt-3">
					<div className="col-sm-8">
						<CustomTable
							title={constancies.length === 0 ? "No se encontraron constancias" : "Constancias"}
							columns={usuariosColumns}
							data={constancies}
							simpleSetFunction={setConstancylected}
						></CustomTable>
					</div>

					{constancySelected && (
						<div className="col-sm-4">
							<ConstancySelectedDetail
								constancy={constancySelected}
								modalState={modalState}
								setModalState={setModalState}
							/>
						</div>
					)}
				</div>
			)}
		</>
	);
};
