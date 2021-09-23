import React from "react";
import { SystemUserCard } from "../cards/SystemUserCard";
import { SystemUsersTable } from "../tables/SystemUsersTable";

export const UsersRoleManagement = () => {
	return (
		<div>
			<div className="">
				<h3>Gestión de roles de usuarios</h3>
			</div>

			<div className="row mt-4">
				<div className="col-sm-8">
					<SystemUsersTable />
				</div>

				<div className="col-sm-4">
					<SystemUserCard />
				</div>
			</div>
		</div>
	);
};
