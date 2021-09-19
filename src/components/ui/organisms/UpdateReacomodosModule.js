import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateReacomodos } from "../../../helpers/DB/updateReacomodos";
import { FileInput } from "../atoms/FileInput";

export const UpdateReacomodosModule = () => {
	const { updatingReacomodos } = useSelector((state) => state.scenes.padronScreen);
	const dispatch = useDispatch();

	const startUpdateReacomodos = (file) => {
		dispatch(updateReacomodos(file));
	};

	return (
		<FileInput
			actionFunction={startUpdateReacomodos}
			title="Cargar Reacomodos"
			updating={updatingReacomodos}
			fileExtension=".xlsx"
		/>
	);
};
