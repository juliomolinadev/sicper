import React from "react";
import { useDispatch } from "react-redux";
import { setModulo } from "../../actions/autorizadosScreen";

export const AutorizadosScreen = () => {
	const modulos = [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		"9B",
		10,
		11,
		12,
		13,
		14,
		15,
		16,
		17,
		18,
		19,
		20,
		21,
		22
	];

	const dispatch = useDispatch();

	// const { modulo } = useSelector((state) => state.autorizadosScreen);

	const setModuloToEdit = (modulo) => {
		console.log("modulo en set: ", modulo);
		dispatch(setModulo(modulo));
	};

	return (
		<>
			<div className="row pt-3">
				<div className="col-sm-8 border rounded">
					{modulos.map((modulo) => {
						return (
							<button
								key={modulo}
								className="btn btn-outline-primary m-1"
								type="button"
								onClick={() => setModuloToEdit(modulo)}
							>
								<span>M-{modulo}</span>
							</button>
						);
					})}
				</div>
			</div>
		</>
	);
};
