import React from "react";
import { ResumenExpedicion } from "../modulos/ResumenExpedicion";
import { FichaExpedicion } from "../modulos/FichaExpedicion";
import { NuevoPermisoButton } from "../buttons/NuevoPermisoButton";

export const SicperScreen = () => {
	return (
		<>
			<div className="row pt-5">
				<div className="col-sm-8">
					<ResumenExpedicion />
				</div>
				<div className="col-sm-4">
					<NuevoPermisoButton />
					<FichaExpedicion />
				</div>
			</div>
		</>
	);
};
