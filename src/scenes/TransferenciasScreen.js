import React from "react";
import { UserCard } from "../components/cards/UserCard";
import { TransferForm } from "../components/forms/TransferForm";
import { UsuariosInput } from "../components/inputs/UsuariosInput";
import { NuevoProductorModal } from "../components/modals/NuevoProductorModal";
import { ProductorModal } from "../components/modals/ProductorModal";
import { CultivoModal } from "../components/modals/CultivoModal";
import { UsuariosTable } from "../components/tables/UsuariosTable";
import { LocalidadesModal } from "../components/modals/LocalidadesModal";

export const TransferenciasScreen = () => {
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
					<UserCard />
					<TransferForm />
				</div>
			</div>
			<ProductorModal />
			<NuevoProductorModal />
			<CultivoModal />
			<LocalidadesModal />
		</>
	);
};