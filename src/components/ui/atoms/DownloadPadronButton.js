import React from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { exportJSONToExcel } from "../../../helpers/functions/exportJSONToExcel";
import { loadUsuarios } from "../../../helpers/loadUsuarios";

export const DownloadPadronButton = () => {
	const { modulo, name, variablesGlobales } = useSelector((state) => state.auth);
	const { cicloActual: ciclo } = variablesGlobales;

	const title = `PadronM${modulo}`;
	const headers = {
		header: [
			"CUENTA",
			"APPATERNO",
			"APMATERNO",
			"NOMBRE",
			"MODULO",
			"SECCION",
			"EJ/COL",
			"LOCALIDAD",
			"PREDIO",
			"REACOMODO",
			"HA",
			"SISTEMA"
		]
	};

	const startDowloadPadron = async () => {
		Swal.fire({
			title: "Atención!!",
			text: `Al confirmar se iniciará la descarga del padrón de usuarios en formato excel.`,
			icon: "question",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Descargar",
			cancelButtonText: "Cancelar"
		}).then(async ({ isConfirmed }) => {
			if (isConfirmed) {
				const usuarios = await loadUsuarios("", modulo, ciclo);
				const padron = usuarios.map((usuario) => ({
					CUENTA: usuario.id,
					APPATERNO: usuario.apPaterno,
					APMATERNO: usuario.apMaterno,
					NOMBRE: usuario.nombre,
					MODULO: usuario.modulo,
					SECCION: usuario.seccion,
					"EJ/COL": usuario.tipoLocalidad,
					LOCALIDAD: usuario.nombreLocalidad,
					PREDIO: usuario.predio,
					REACOMODO: usuario.reacomodo,
					HA: usuario.supRiego,
					SISTEMA: usuario.sistemaRiego
				}));

				exportJSONToExcel(padron, headers, title, name, title);
			}
		});
	};

	return (
		<button onClick={startDowloadPadron} className="btn btn-outline-primary m-3">
			<i className="fas fa-download mr-2"></i>
			Descargar Padron
		</button>
	);
};
