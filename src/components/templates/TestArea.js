import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePadron } from "../../helpers/DB/updatePadron";
import { FileInput } from "../ui/atoms/FileInput";

export const TestArea = () => {
	const { updatingPadron } = useSelector((state) => state.scenes.padronScreen);
	const dispatch = useDispatch();

	const startUpdatePadron = (file) => {
		dispatch(updatePadron(file));
	};

	return (
		<>
			<div className="row justify-content-center pt-5">
				<h1>TestArea</h1>
			</div>
			<div className="row justify-content-center pt-5">
				<FileInput
					actionFunction={startUpdatePadron}
					title="Cargar Padron"
					updating={updatingPadron}
					fileExtension=".xlsx"
				/>
			</div>
		</>
	);
};
