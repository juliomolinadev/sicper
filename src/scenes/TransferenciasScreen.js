import React, { useEffect } from "react";
import { UserCard } from "../components/cards/UserCard";
import { TransferForm } from "../components/forms/TransferForm";
import { UsuariosInput } from "../components/inputs/UsuariosInput";
import { NuevoProductorModal } from "../components/modals/NuevoProductorModal";
import { ProductorModal } from "../components/modals/ProductorModal";
import { CultivoModal } from "../components/modals/CultivoModal";
import { UsuariosTable } from "../components/tables/UsuariosTable";
import { LocalidadesModal } from "../components/modals/LocalidadesModal";
import { useDispatch, useSelector } from "react-redux";
import { PrintTransferModal } from "../components/modals/PrintTransferModal";
import { useFormToUpper } from "../hooks/UseFormToUpper";
import { TransferTable } from "../components/tables/TransferTable";
import { startSetTransferencias, unsetTransferencia } from "../actions/transferenciasScreen";
import { TransferCard } from "../components/cards/TransferCard";
import { unsetUsuarios, unsetUsuarioSelected } from "../actions/usuarios";

export const TransferenciasScreen = () => {
	const { usuario } = useSelector((state) => state.entidades);
	const { variablesGlobales, modulo } = useSelector((state) => state.auth);
	const { cicloActual: ciclo } = variablesGlobales;
	const { nuevaTransferencia } = useSelector((state) => state.transferenciasScreen);
	const { transferencia } = useSelector((state) => state.transferenciasScreen);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(startSetTransferencias(ciclo, modulo));
		dispatch(unsetTransferencia());
		dispatch(unsetUsuarios());
		dispatch(unsetUsuarioSelected());
	}, [dispatch, ciclo, modulo]);

	const [values, handleInputChange, reset] = useFormToUpper({
		superficieTransferida: "",
		loteDestino: "",
		moduloDestino: "",
		cultivo: "",
		localtie: "",
		apPaternoSolicitante: "",
		apMaternoSolicitante: "",
		nombreSolicitante: ""
	});

	return (
		<>
			<div className="row mt-5">
				<div className="col-sm-8">
					<div className="border rounded p-4">
						<h3 className="mb-4">Transferir superficie</h3>
						<UsuariosInput />
						<UsuariosTable />
					</div>

					<div className="border rounded p-4 mt-5">
						<h3 className="mb-4">Transferencias recibidas</h3>
						<TransferTable />
					</div>
				</div>

				<div className="col-sm-4">
					{usuario && (
						<>
							<UserCard />
							<TransferForm values={values} handleInputChange={handleInputChange} />
						</>
					)}
					{transferencia && <TransferCard transferencia={transferencia} />}
				</div>
			</div>

			<ProductorModal />
			<NuevoProductorModal />
			<CultivoModal />
			<LocalidadesModal />
			{nuevaTransferencia && (
				<PrintTransferModal transferencia={nuevaTransferencia} reset={reset} />
			)}
			{transferencia && <PrintTransferModal transferencia={transferencia} reset={reset} />}
		</>
	);
};
