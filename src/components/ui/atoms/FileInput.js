import React from "react";
import Swal from "sweetalert2";

export const FileInput = ({ actionFunction, title, updating = false, fileExtension }) => {
	const handleInputChange = (e) => {
		const file = e.target.files[0];

		const extension = file.name.match(/\.[0-9a-z]+$/i);

		if (extension[0] === fileExtension) actionFunction(file);
		else {
			Swal.fire(
				"Formato incorrecto",
				`Verifique que el archivo que intenta cargar tenga la extensión "${fileExtension}".`,
				"error"
			);
		}
	};

	return (
		<div>
			<div className="d-flex">
				<label htmlFor="input" className="align-self-center">
					{title}
				</label>
				{updating && (
					<div className="spinner-border text-primary align-self-center ml-2" role="status">
						<span className="sr-only">Loading...</span>
					</div>
				)}
			</div>
			<input
				id="input"
				type="file"
				className="form-control-file mt-4"
				onChange={handleInputChange}
			></input>
		</div>
	);
};
