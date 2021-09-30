import React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { exportJSONToExcel } from "../../../helpers/functions/exportJSONToExcel";
import { loadUsuarios } from "../../../helpers/loadUsuarios";

export const DownloadPadronButton = () => {
	const { modulo, name } = useSelector((state) => state.auth);

	const title = `ParonM${modulo}`;
	// const data = [];
	const headers = {
		header: [
			"id",
			"cuenta",
			"subcta",
			"apPaterno",
			"apMaterno",
			"nombre",
			"modulo",
			"seccion",
			"nombreLocalidad",
			"predio",
			"reacomodo",
			"supRiego",
			"sistemaRiego"
		]
	};

	// const cleanPadron = (padron) => {
	// 	return padron.map((usuario) => ({
	// 		id: usuario.usuario,
	// 		cuenta: usuario.usuario,
	// 		subcta: usuario.usuario,
	// 		apPaterno: usuario.usuario,
	// 		apMaterno: usuario.usuario,
	// 		nombre: usuario.usuario,
	// 		modulo: usuario.usuario,
	// 		seccion: usuario.usuario,
	// 		nombreLocalidad: usuario.usuario,
	// 		predio: usuario.usuario,
	// 		reacomodo: usuario.usuario,
	// 		supRiego: usuario.usuario,
	// 		sistemaRiego: usuario.usuario
	// 	}));
	// };

	const startDowloadPadron = async () => {
		Swal.fire({
			title: "Atención!!",
			text: `Al confirmar se iniciará la descarga del padrón de usuarios en formato excel.`,
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Descargar",
			cancelButtonText: "Cancelar"
		}).then(async ({ isConfirmed }) => {
			if (isConfirmed) {
				const usuarios = await loadUsuarios("", modulo);

				exportJSONToExcel(usuarios, headers, title, name, title);
			}
		});
	};

	return (
		<button onClick={startDowloadPadron} className="btn btn-outline-primary m-3">
			Descargar Padron
		</button>
	);
};
