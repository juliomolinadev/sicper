import React from "react";

export const UnassignedPrivilegesMessage = () => {
	return (
		<div className="border border-warning rounded p-4">
			<h3>¡Aún no tiene privilegios !</h3>
			<p>
				Por favor póngase en contacto con el administrador del sistema para que se le asignen
				privilegios de usuario.
			</p>
		</div>
	);
};
