import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePadron } from "../../../helpers/DB/updatePadron";
import { FileInput } from "../atoms/FileInput";

export const UpdatePadronModule = () => {
	const { updatingPadron } = useSelector((state) => state.scenes.padronScreen);
	const dispatch = useDispatch();

	const startUpdatePadron = (file) => {
		dispatch(updatePadron(file));
	};

	return (
		<FileInput
			actionFunction={startUpdatePadron}
			title="Cargar Padron"
			updating={updatingPadron}
			fileExtension=".xlsx"
		/>
	);
};
