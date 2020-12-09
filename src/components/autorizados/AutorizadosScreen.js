import React from "react";

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

	return (
		<>
			<div className="row pt-3">
				<div className="col-sm-8 border rounded">
					{modulos.map((modulo, index) => {
						return (
							<button key={index} className="btn btn-outline-primary m-1" type="button">
								<span>M-{modulo}</span>
							</button>
						);
					})}
				</div>
			</div>
		</>
	);
};
