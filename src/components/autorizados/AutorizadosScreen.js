import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setAutorizadoSelected,
	setModulo,
	startLoadAutorizados
} from "../../actions/autorizadosScreen";
import { AutorizadosModal } from "../modals/AutorizadosModal";
import { autorizadosColumns } from "../tables/configTables";
import { CustomTable } from "../tables/CustomTable";

export const AutorizadosScreen = () => {
	const modulos = [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		"9B",
		10,
		11,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20,
		21,
		22
	];

	const dispatch = useDispatch();

	const { modulo, autorizados, autorizadoSelected } = useSelector(
		(state) => state.autorizadosScreen
	);

	const setModuloToEdit = (moduloToEdit) => {
		dispatch(setModulo(moduloToEdit));
		dispatch(startLoadAutorizados(modulo));
	};

	return (
		<>
			<div className="row pt-3 .autorizadosModal">
				<div className="col-sm-8 ">
					{modulos.map((moduloIndex) => {
						if (modulo === moduloIndex) {
							return (
								<button
									key={moduloIndex}
									className="btn btn-primary m-1"
									type="button"
									onClick={() => setModuloToEdit(moduloIndex)}
								>
									<span>M-{moduloIndex}</span>
								</button>
							);
						} else {
							return (
								<button
									key={moduloIndex}
									className="btn btn-outline-primary m-1"
									type="button"
									onClick={() => setModuloToEdit(moduloIndex)}
								>
									<span>M-{moduloIndex}</span>
								</button>
							);
						}
					})}
				</div>
			</div>

			<div className="row pt-5">
				<div className="col-sm-8">
					{modulo ? (
						<CustomTable
							title="Autorizados"
							columns={autorizadosColumns}
							data={autorizados}
							setFunction={setAutorizadoSelected}
						></CustomTable>
					) : (
						<></>
					)}
				</div>
			</div>
			{autorizadoSelected ? <AutorizadosModal /> : <></>}
		</>
	);
};
