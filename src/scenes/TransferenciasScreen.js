import React from "react";
import { UserCard } from "../components/cards/UserCard";
import { TransferForm } from "../components/forms/TransferForm";
import { UsuariosInput } from "../components/inputs/UsuariosInput";
import { NuevoProductorModal } from "../components/modals/NuevoProductorModal";
import { ProductorModal } from "../components/modals/ProductorModal";
import { CultivoModal } from "../components/modals/CultivoModal";
import { UsuariosTable } from "../components/tables/UsuariosTable";
import { LocalidadesModal } from "../components/modals/LocalidadesModal";
import { useSelector } from "react-redux";
import { PrintTransferModal } from "../components/modals/PrintTransferModal";
import { useFormToUpper } from "../hooks/UseFormToUpper";

export const TransferenciasScreen = () => {
	const { usuario } = useSelector((state) => state.entidades);
	const { transferencia } = useSelector((state) => state.transferenciasScreen);

	const [values, handleInputChange, reset] = useFormToUpper({
		superficieTransferida: 0,
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
			<div className="row mt-4">
				<div className="col-sm-8">
					<UsuariosInput />
				</div>
			</div>

			<div className="row">
				<div className="col-sm-8">
					<UsuariosTable />
				</div>
				<div className="col-sm-4">
					{usuario && (
						<>
							<UserCard />
							<TransferForm values={values} handleInputChange={handleInputChange} />
						</>
					)}
				</div>
			</div>
			<ProductorModal />
			<NuevoProductorModal />
			<CultivoModal />
			<LocalidadesModal />
			{transferencia && <PrintTransferModal transferencia={transferencia} reset={reset} />}
		</>
	);
};
