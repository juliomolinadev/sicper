import React from "react";
import { UserCard } from "../components/cards/UserCard";
import { TransferForm } from "../components/forms/TransferForm";
import { UsuariosInput } from "../components/inputs/UsuariosInput";
import { UsuariosTable } from "../components/tables/UsuariosTable";

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
		</>
	);
};
