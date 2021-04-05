import React from "react";
import { SystemUserCard } from "../cards/SystemUserCard";
import { SystemUsersTable } from "../tables/SystemUsersTable";

export const CNAUsersRegister = () => {
	return (
		<>
			<div className="row">
				<h3>Gestión de usuarios CNA</h3>
			</div>
			<div className="row pt-4">
				<div className="col-sm-8">
					<SystemUsersTable />
				</div>

				<div className="col-sm-4">
					<SystemUserCard />
				</div>
			</div>
		</>
	);
};
