import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cargarPermisosExcel } from "../../helpers/DB/cargarPermisosExcel";
import { FileInput } from "../ui/atoms/FileInput";

export const PermisosExcelModule = () => {
	const { updatingPermisos } = useSelector((state) => state.ui);
	const dispatch = useDispatch();

	const startUpdatePermisos = (file) => {
		dispatch(cargarPermisosExcel(file, "2020-2021"));
	};

	return (
		<div>
			<h3>Subir Permisos</h3>

			<FileInput
				actionFunction={startUpdatePermisos}
				title="Cargar Padron"
				updating={updatingPermisos}
				fileExtension=".xlsx"
			/>
		</div>
	);
};
